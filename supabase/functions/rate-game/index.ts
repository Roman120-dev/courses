import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  const { gameId, result } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // TODO: compute ELO changes and update profiles
  await supabase.from("games").update({ status: "finished", result }).eq("id", gameId);

  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
});