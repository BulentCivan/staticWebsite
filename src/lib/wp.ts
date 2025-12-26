
export async function wpGraphQL<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const url = process.env.WORDPRESS_GRAPHQL_URL;
  if (!url) throw new Error("WORDPRESS_GRAPHQL_URL is missing");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ query, variables }),
  });
  //console.log(res);
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? json, null, 2));
  return json.data as T;
}
