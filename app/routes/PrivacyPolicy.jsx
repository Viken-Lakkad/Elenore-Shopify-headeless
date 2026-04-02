// PrivacyPolicy

import { shopifyGraphQL } from "../utils/shopify-admin";
import { privacyPolicyQuery } from "../graphql/queries/Queries";
import { useLoaderData } from "react-router";

export async function loader() {
  const data = await shopifyGraphQL(privacyPolicyQuery);

  const privacyPolicy = data?.shop?.privacyPolicy ?? null;

  return { privacyPolicy };
}

export function meta({ data }) {
  const policy = data?.privacyPolicy;

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
  const { privacyPolicy } = useLoaderData();

  if (!privacyPolicy) {
    return <p className="text-center py-10">Policy not available</p>;
  }

  return (
    <div className="container m-auto py-10 px-1.5">
      <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 text-center font-ralesha">
        {privacyPolicy.title}
      </h1>

      <div
        className="prose max-w-none policy-content"
        dangerouslySetInnerHTML={{
          __html: privacyPolicy.body,
        }}
      />
    </div>
  );
}
