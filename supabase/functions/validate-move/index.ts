// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Chess } from "https://esm.sh/chess.js@1";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  const { gameId, from, to, promotion, playerId } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: game, error } = await supabase
    .from("games")
    .select("id, fen, status")
    .eq("id", gameId)
    .single();

  if (error || !game || game.status !== "active") {
    return new Response(JSON.stringify({ error: "Game not active" }), { status: 400 });
  }

  const chess = new Chess(game.fen ?? undefined);
  const move = chess.move({ from, to, promotion: promotion ?? undefined } as any);
  if (!move) return new Response(JSON.stringify({ error: "Invalid move" }), { status: 400 });

  const fen = chess.fen();
  const { error: mErr } = await supabase.from("moves").insert({
    game_id: gameId,
    ply: chess.history().length,
    san: move.san,
    from_square: from,
    to_square: to,
    promotion: promotion ?? null,
    fen_after: fen,
    made_by: playerId,
  });

  if (mErr) return new Response(JSON.stringify({ error: "DB error" }), { status: 500 });

  await supabase.from("games").update({ fen }).eq("id", gameId);

  return new Response(JSON.stringify({ ok: true, fen, san: move.san }), { headers: { "Content-Type": "application/json" } });
});