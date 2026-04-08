// TermsOfService

import { shopifyGraphQL } from "../utils/shopify-admin";
import { termsPolicyQuery } from "../graphql/queries/Queries";
import { useLoaderData } from "react-router";

export async function loader() {
  const data = await shopifyGraphQL(termsPolicyQuery);

  const termsPolicy = data?.shop?.termsOfService ?? null;

  return { termsPolicy };
}

export function meta({ data }) {
  const policy = data?.termsPolicy;

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

export default function TermsOfService() {
  const { termsPolicy } = useLoaderData();
  console.log("termsPolicy", termsPolicy);

  if (!termsPolicy) {
    return (
      <div className="text-center py-10">
        Terms of Service not configured in Shopify
      </div>
    );
  }

  return (
    <div className="lg:container m-auto py-10 px-1.5">
      <h1 className="text-3xl lg:text-5xl font-extrabold mb-6 text-center font-ralesha">
        {termsPolicy.title}
      </h1>

      <div
        className="prose max-w-none policy-content"
        dangerouslySetInnerHTML={{
          __html: termsPolicy.body,
        }}
      />
    </div>
  );
}
