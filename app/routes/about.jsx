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
  return [{ title: "About Us" }, { name: "description", content: "About Us" }];
}

export async function loader() {
  const aboutUsBenaerData = await shopifyGraphQL(aboutUsBenaerQuery);
  const aboutUsBenaer = aboutUsBenaerData.metaobjects?.nodes?.[0] || null;

  const ourStoryData = await shopifyGraphQL(getOurStoryQuery);
  const ourStory = ourStoryData.metaobjects?.nodes?.[0] || null;

  const ourDesignsData = await shopifyGraphQL(getOurDesignsQuery);
  const ourDesigns = ourDesignsData.metaobjects?.nodes?.[0] || null;

  const ourPromiseData = await shopifyGraphQL(getOurPromiseQuery);
  const ourPromise = ourPromiseData.metaobjects?.nodes?.[0] || null;

  return {
    aboutUsBenaer,
    ourStory,
    ourDesigns,
    ourPromise,
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
