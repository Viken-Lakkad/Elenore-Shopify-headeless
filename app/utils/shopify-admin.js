export async function shopifyGraphQL(query, variables = {}) {
  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error("GraphQL Errors:", json.errors);
    throw new Error(`GraphQL Error: ${JSON.stringify(json.errors)}`);
  }

  return json.data; // ✅ unwrap data here
}