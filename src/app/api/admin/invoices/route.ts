export async function GET() {
  return new Response(JSON.stringify({ message: "API route placeholder" }), {
    headers: { "content-type": "application/json" },
  });
}
