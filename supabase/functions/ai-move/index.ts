// deno-lint-ignore-file no-explicit-any
import { Chess } from "https://esm.sh/chess.js@1";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  const { fen } = await req.json();
  const chess = new Chess(fen);
  const moves = chess.moves({ verbose: true }) as any[];
  if (moves.length === 0) return new Response(JSON.stringify({ move: null }));
  const best = moves[Math.floor(Math.random() * moves.length)];
  return new Response(JSON.stringify({ move: { from: best.from, to: best.to, promotion: best.promotion ?? null } }), {
    headers: { "Content-Type": "application/json" },
  });
});