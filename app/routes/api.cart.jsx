const cartFragment = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              product {
                title
                featuredImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

const cartCreateMutation = `
  ${cartFragment}
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
`;

const cartLinesAddMutation = `
  ${cartFragment}
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFragment }
      userErrors { field message }
    }
  }
`;

async function storefrontGraphQL(query, variables = {}) {
  const res = await fetch(
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

  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data;
}

export async function action({ request }) {
  try {
    const { variantId, quantity, cartId } = await request.json();

    let cart;

    if (cartId) {
      const data = await storefrontGraphQL(cartLinesAddMutation, {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      });

      if (data.cartLinesAdd.userErrors.length > 0) {
        return Response.json(
          { error: data.cartLinesAdd.userErrors[0].message },
          { status: 400 }
        );
      }

      cart = data.cartLinesAdd.cart;
    } else {
      const data = await storefrontGraphQL(cartCreateMutation, {
        input: {
          lines: [{ merchandiseId: variantId, quantity }],
        },
      });

      if (data.cartCreate.userErrors.length > 0) {
        return Response.json(
          { error: data.cartCreate.userErrors[0].message },
          { status: 400 }
        );
      }

      cart = data.cartCreate.cart;
    }

    return Response.json({ cart });
  } catch (err) {
    console.error("Cart API error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}