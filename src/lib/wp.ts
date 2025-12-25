const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || "http://localhost:8080/graphql";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const url = endpoint.startsWith("/")
  ? `${baseUrl}${endpoint}`
  : endpoint;

// fetch(url, ...) burada kullanılacak



export async function wpGraphQL<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const url = process.env.WORDPRESS_GRAPHQL_URL;
  if (!url) throw new Error("WORDPRESS_GRAPHQL_URL is missing");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors ?? json, null, 2));
  return json.data as T;
}
