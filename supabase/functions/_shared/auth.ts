import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

export interface AuthResult {
  user: { id: string; email?: string } | null;
  error: Response | null;
  supabase: SupabaseClient | null;
}

/**
 * Verifies the user is authenticated and optionally checks for admin role
 */
export async function verifyAuth(req: Request, requireAdmin = false): Promise<AuthResult> {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader?.startsWith('Bearer ')) {
    return {
      user: null,
      supabase: null,
      error: new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    };
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  // Use service role key for admin operations
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  
  // Extract the JWT token and validate it
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    console.error('Auth validation failed:', error?.message);
    return {
      user: null,
      supabase: null,
      error: new Response(
        JSON.stringify({ error: 'Invalid authentication token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    };
  }

  if (requireAdmin) {
    const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', {
      _user_id: user.id,
      _role: 'admin'
    });

    if (roleError || !isAdmin) {
      return {
        user: null,
        supabase: null,
        error: new Response(
          JSON.stringify({ error: 'Admin access required' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      };
    }
  }

  return {
    user: { id: user.id, email: user.email },
    supabase,
    error: null
  };
}

/**
 * Sanitizes error messages to prevent information leakage
 */
export function sanitizeError(error: unknown, context: string): { error: string } {
  // Log full error server-side for debugging
  console.error(`[${context}] Error:`, error);
  
  // Return generic message to client
  return { error: 'An error occurred. Please try again.' };
}

export { corsHeaders };
