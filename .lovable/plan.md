

## Switch OTP Provider to Wati

### What changes
One file: `supabase/functions/challenge-vote/index.ts` — replace the current WhatsApp API call with Wati's `sendTemplateMessage` endpoint.

### Wati API Details
- **Endpoint**: `https://live-mt-server.wati.io/420836/api/v1/sendTemplateMessage`
- **Template**: `fisique_auth`
- **Parameter**: `{{1}}` for OTP code
- **Auth**: `Bearer` token via `WATI_API_TOKEN` secret

### Steps

1. **Add secret** `WATI_API_TOKEN` — store your Wati access token
2. **Update edge function** — replace the current fetch call (~lines 67-79) with:
   ```ts
   const waRes = await fetch(
     `https://live-mt-server.wati.io/420836/api/v1/sendTemplateMessage?whatsappNumber=${phone}`,
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${Deno.env.get("WATI_API_TOKEN")}`,
       },
       body: JSON.stringify({
         template_name: "fisique_auth",
         broadcast_name: "otp_verification",
         parameters: [{ name: "1", value: otpCode }],
       }),
     }
   );
   ```

No database changes needed. No frontend changes needed.

