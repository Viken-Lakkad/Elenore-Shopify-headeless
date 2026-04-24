import { useLoaderData } from "react-router";
import { AboutUs } from "../components/AboutUs";
import { OurDesigns } from "../components/OurDesigns";
import { OurPromise } from "../components/OurPromise";
import { OurStory } from "../components/OurStory";
import {
  aboutUsBenaerQuery,
  getOurStoryQuery,
  getOurDesignsQuery,
  getOurPromiseQuery,
} from "../graphql/queries/Queries";
import { shopifyGraphQL } from "../utils/shopify-admin";

export function meta() {
  return [
    { title: "About Us | Brand Name" },
    {
      name: "description",
      content:
        "Discover the story behind Brand Name — our promise, our designs, and the values that drive everything we create.",
    },
  ];
}

export async function loader() {
  const [aboutUsBenaerData, ourStoryData, ourDesignsData, ourPromiseData] =
    await Promise.all([
      shopifyGraphQL(aboutUsBenaerQuery),
      shopifyGraphQL(getOurStoryQuery),
      shopifyGraphQL(getOurDesignsQuery),
      shopifyGraphQL(getOurPromiseQuery),
    ]);

  return {
    aboutUsBenaer: aboutUsBenaerData.metaobjects?.nodes?.[0] ?? null,
    ourStory: ourStoryData.metaobjects?.nodes?.[0] ?? null,
    ourDesigns: ourDesignsData.metaobjects?.nodes?.[0] ?? null,
    ourPromise: ourPromiseData.metaobjects?.nodes?.[0] ?? null,
  };
}

export default function AboutUsPage() {
  const { aboutUsBenaer, ourStory, ourDesigns, ourPromise } = useLoaderData();

  return (
    <>
      <AboutUs aboutUsBenaer={aboutUsBenaer} />
      <OurStory ourStory={ourStory} />
      <OurDesigns ourDesigns={ourDesigns} />
      <OurPromise ourPromise={ourPromise} />
    </>
  );
}
