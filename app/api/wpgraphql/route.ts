export async function POST(req: Request) {
  const body = await req.text();

  const upstream = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { "content-type": "application/json" },
  });
}
