import { shopifyGraphQL } from "../utils/shopify-admin";
import { returnPolicyQuery } from "../graphql/queries/Queries";
import { useLoaderData } from "react-router";

export async function loader() {
  const data = await shopifyGraphQL(returnPolicyQuery);

  const returnPolicy = data?.shop?.refundPolicy ?? null;

  return { returnPolicy };
}

export function meta({ data }) {
  const policy = data?.returnPolicy;

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

export default function ReturnAndRefund() {
  const { returnPolicy } = useLoaderData();

  if (!returnPolicy) {
    return <p className="text-center py-10">Policy not available</p>;
  }

  return (
    <div className="container m-auto py-10 px-1.5">
      <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 text-center font-ralesha">
        {returnPolicy.title}
      </h1>

      <div
        className="prose max-w-none policy-content"
        dangerouslySetInnerHTML={{
          __html: returnPolicy.body,
        }}
      />
    </div>
  );
}
