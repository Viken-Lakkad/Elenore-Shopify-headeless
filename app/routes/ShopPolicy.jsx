import { shopifyGraphQL } from "../utils/shopify-admin";
import { shippingPolicyQuery } from "../graphql/queries/Queries";
import { useLoaderData } from "react-router";

export async function loader() {
  const data = await shopifyGraphQL(shippingPolicyQuery);

  const shippingPolicy = data?.shop?.shippingPolicy;

  return { shippingPolicy };
}

export function meta({ data }) {
  const policy = data?.shippingPolicy;

  return [
    {
      title: policy?.title,
    },
    {
      name: "description",
      content: policy?.body?.replace(/<[^>]+>/g, "").slice(0, 150),
    },
  ];
}

export default function ShopPolicy() {
  const { shippingPolicy } = useLoaderData();
  return (
    <>
      <div className="container m-auto py-10 px-1.5">
        <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 text-center font-ralesha">
          {shippingPolicy.title}
        </h1>

        <div
          className="prose max-w-none policy-content"
          dangerouslySetInnerHTML={{
            __html: shippingPolicy.body,
          }}
        />
      </div>
    </>
  );
}
