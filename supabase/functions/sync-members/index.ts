import { corsHeaders } from '../_shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

function toTitleCase(str: string): string {
  return str.trim().toLowerCase().replace(/(?:^|\s)\S/g, (m) => m.toUpperCase());
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawApiKey = Deno.env.get('ACTIVE_MEMBERS_API_KEY')?.trim();
    if (!rawApiKey) throw new Error('ACTIVE_MEMBERS_API_KEY not configured');

    const hadBearerPrefix = /^Bearer\s+/i.test(rawApiKey);
    const apiKey = rawApiKey.replace(/^Bearer\s+/i, '').trim();
    if (!apiKey) throw new Error('ACTIVE_MEMBERS_API_KEY is empty after normalization');
    console.log('sync-members token format:', { hadBearerPrefix, tokenLength: apiKey.length });

    // 1. Fetch active members from membership hub
    const apiUrl = 'https://vuuqslqhjuzjllribugt.supabase.co/functions/v1/active-members';
    const res = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Membership hub returned ${res.status}: ${text}`);
    }

    const { members } = await res.json() as { members: { name: string; phone: string }[] };

    if (!Array.isArray(members) || members.length === 0) {
      return new Response(JSON.stringify({ synced: 0, message: 'No active members returned' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 2. Deduplicate by phone, apply Title Case
    const deduped = Array.from(
      new Map(
        members
          .filter((m) => m.name && m.phone)
          .map((m) => [m.phone.trim(), { name: toTitleCase(m.name), phone: m.phone.trim() }])
      ).values()
    );

    // 3. Upsert into challenge_participants (only update name, preserve points/referrals/votes)
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data, error } = await supabase
      .from('challenge_participants')
      .upsert(
        deduped.map((m) => ({ name: m.name, phone: m.phone })),
        { onConflict: 'phone', ignoreDuplicates: false }
      )
      .select('id');

    if (error) throw error;

    const syncedCount = data?.length ?? deduped.length;

    // 4. Update last synced timestamp in site_settings
    await supabase
      .from('site_settings')
      .upsert(
        { key: 'members_last_synced', value: new Date().toISOString(), description: 'Last member sync from membership hub' },
        { onConflict: 'key' }
      );

    return new Response(JSON.stringify({ synced: syncedCount, message: `Synced ${syncedCount} active members` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('sync-members error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
