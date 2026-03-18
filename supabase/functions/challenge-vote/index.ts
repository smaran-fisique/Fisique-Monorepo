import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateDiscountCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "FQ-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { action, phone, participant_id, otp, voter_phone } = await req.json();

    // ── SEND OTP ──
    if (action === "send-otp") {
      if (!phone) {
        return new Response(JSON.stringify({ error: "Phone number required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const otpCode = generateOTP();

      // Clean up old OTPs for this phone
      await supabase.from("challenge_otps").delete().eq("phone", phone);

      // Store new OTP
      const { error: insertErr } = await supabase
        .from("challenge_otps")
        .insert({ phone, otp: otpCode });

      if (insertErr) {
        console.error("OTP insert error:", insertErr);
        return new Response(JSON.stringify({ error: "Failed to generate OTP" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Send via WhatsApp API
      try {
        const waRes = await fetch(
          `https://live-mt-server.wati.io/420836/api/v2/sendTemplateMessage?whatsappNumber=${phone}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json-patch+json",
              "Authorization": `Bearer ${Deno.env.get("WATI_API_TOKEN")}`,
            },
            body: JSON.stringify({
              template_name: "fisique_auth",
              broadcast_name: "otp_verification",
              parameters: [{ name: "1", value: otpCode }],
            }),
          }
        );
        const waBody = await waRes.text();
        console.log("Wati API response:", waRes.status, waBody);
      } catch (waErr) {
        console.error("WhatsApp API error:", waErr);
        // Still return success — OTP is stored, user might not receive it but we don't block
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── VERIFY VOTE ──
    if (action === "verify-vote") {
      if (!participant_id || !voter_phone || !otp) {
        return new Response(
          JSON.stringify({ error: "participant_id, voter_phone, and otp are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Look up valid OTP (within 5 minutes)
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { data: otpRow, error: otpErr } = await supabase
        .from("challenge_otps")
        .select("*")
        .eq("phone", voter_phone)
        .eq("otp", otp)
        .gte("created_at", fiveMinAgo)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (otpErr || !otpRow) {
        return new Response(
          JSON.stringify({ error: "Invalid or expired OTP. Please request a new one." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if already voted for this participant
      const { data: existingVote } = await supabase
        .from("challenge_votes")
        .select("id")
        .eq("voter_phone", voter_phone)
        .eq("participant_id", participant_id)
        .maybeSingle();

      if (existingVote) {
        // Clean up OTP
        await supabase.from("challenge_otps").delete().eq("phone", voter_phone);
        return new Response(
          JSON.stringify({ error: "You have already voted for this participant." }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if voter already has a discount code from a previous vote
      const { data: priorVote } = await supabase
        .from("challenge_votes")
        .select("discount_code, discount_expires_at")
        .eq("voter_phone", voter_phone)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      const discountCode = priorVote?.discount_code ?? generateDiscountCode();
      const expiresAt = priorVote?.discount_expires_at ?? new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

      // Insert vote
      const { error: voteErr } = await supabase.from("challenge_votes").insert({
        participant_id,
        voter_phone,
        discount_code: discountCode,
        discount_expires_at: expiresAt,
      });

      if (voteErr) {
        console.error("Vote insert error:", voteErr);
        if (voteErr.code === "23505") {
          return new Response(
            JSON.stringify({ error: "You have already voted for this participant." }),
            { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        return new Response(JSON.stringify({ error: "Failed to record vote" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Increment participant points and vote_count
      const { data: participant } = await supabase
        .from("challenge_participants")
        .select("points, vote_count")
        .eq("id", participant_id)
        .single();

      if (participant) {
        await supabase
          .from("challenge_participants")
          .update({
            points: participant.points + 10,
            vote_count: participant.vote_count + 1,
          })
          .eq("id", participant_id);
      }

      // Clean up OTP
      await supabase.from("challenge_otps").delete().eq("phone", voter_phone);

      return new Response(
        JSON.stringify({
          success: true,
          discount_code: discountCode,
          expires_at: expiresAt,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
