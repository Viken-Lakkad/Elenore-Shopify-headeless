import { useLoaderData } from "react-router";
import { AboutUs } from "../components/AboutUs";
import { OurDesigns } from "../components/OurDesigns";
import { OurPromise } from "../components/OurPromise";
import { OurStory } from "../components/OurStory";
import { aboutUsBenaerQuery } from "../graphql/queries/Queries";
import { shopifyGraphQL } from "../utils/shopify-admin";

export function meta() {
  return [{ title: "About Us" }, { name: "description", content: "About Us" }];
}

export async function loader() {
  const aboutUsBenaerData = await shopifyGraphQL(aboutUsBenaerQuery);
  const aboutUsBenaer = aboutUsBenaerData.metaobjects?.nodes?.[0] || null;

  return {
    aboutUsBenaer,
  };
}

export default function AboutUsPage() {
  const { aboutUsBenaer } = useLoaderData();
  
  return (
    <>
      <AboutUs aboutUsBenaer={aboutUsBenaer} />
      <OurStory />
      <OurDesigns />
      <OurPromise />
    </>
  );
}
