import { useLoaderData } from "react-router";
import { shopifyGraphQL } from "../utils/shopify-admin";
import { CelebPicks } from "../components/CelebPicks";
import { Collection } from "../components/Collection";
import { Customers } from "../components/Customers";
import { Earrings } from "../components/Earrings";
import { GiftingGuide } from "../components/GiftingGuide";
import { Hero } from "../components/Hero";
import { NewArrival } from "../components/NewArrival";
import { OffersBanners } from "../components/OffersBanners";
import { OrganiserBox } from "../components/OrganiserBox";
import { Rings } from "../components/Rings";
import { ShopByCategories } from "../components/ShopByCategories";
import { ShopByDesign } from "../components/ShopByDesign";
import { ShopByOccasion } from "../components/ShopByOccasion";
import { Tagline } from "../components/Tagline";
import { TrustedPartner } from "../components/TrustedPartner";
import { WhyElinorJewels } from "../components/WhyElinorJewels";
import {
  heroCollectionQuery,
  collectionsByIdsQuery,
  offerBannerQuery,
  heroBannerQuery,
  shopCategoriesQuery,
  celebPicksQuery,
  customerReviewsQuery,
  GetAllNewArrivals,
  GetAllEarrings,
  GetAllRings,
  GetAllOrganiserBox,
  clientVideoReviewQuery,
  shopByDesignQuery,
  shopByOccasionQuery,
  shopByGiftingGuide,
  whyElinorJewelsQuery,
} from "../graphql/queries/Queries";
import { NewsletterForm } from "../components/NewsletterForm";
import { subscribeNewsletterMutation } from "../graphql/mutations/mutations";
import ProductCollections from "../components/ProductCollections";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email) {
    return { success: false, message: "Email is required." };
  }

  try {
    const data = await shopifyGraphQL(subscribeNewsletterMutation, {
      input: {
        email,
        acceptsMarketing: true,
        password: crypto.randomUUID(), // ← Shopify requires this; user never logs in
      },
    });

    const { customer, customerUserErrors } = data.customerCreate;

    if (customerUserErrors?.length > 0) {
      // Handle "already exists" gracefully
      const alreadyExists = customerUserErrors.some((e) => e.code === "TAKEN");
      if (alreadyExists) {
        return { success: true, message: "You're already subscribed! 🎉" };
      }
      return { success: false, message: customerUserErrors[0].message };
    }

    return { success: true, message: "You're subscribed! 🎉" };
  } catch (err) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function loader() {
  const metafieldData = await shopifyGraphQL(heroCollectionQuery);
  const ids = JSON.parse(metafieldData.shop.heroCollection.value);

  const collectionsData = await shopifyGraphQL(collectionsByIdsQuery(ids));

  const collections = collectionsData.nodes.filter(Boolean).map((col) => ({
    id: col.id,
    title: col.title,
    handle: col.handle,
    image: col.image?.url || null,
    linkUrl: `/collections/${col.handle}`,
  }));

  const offerBannerData = await shopifyGraphQL(offerBannerQuery);
  const offerBanner = offerBannerData.metaobjects?.nodes || [];

  const heroBannerData = await shopifyGraphQL(heroBannerQuery);
  const heroBanner = heroBannerData.metaobjects?.nodes?.[0] || null;

  const shopCategoriesData = await shopifyGraphQL(shopCategoriesQuery);
  const shopCategories = shopCategoriesData.metaobjects?.nodes || [];

  // Fetch celeb picks
  const celebPicksData = await shopifyGraphQL(celebPicksQuery);
  const celebPicks = celebPicksData.metaobjects?.nodes?.[0] || null;

  // Fetch customer reviews
  const customerReviewsData = await shopifyGraphQL(customerReviewsQuery);
  const customerReviews = customerReviewsData.metaobjects?.nodes || [];

  // Fetch new arrivals
  const newCollectionsData = await shopifyGraphQL(GetAllNewArrivals);
  const newCollections = newCollectionsData.metaobjects?.nodes || [];

  // Fetch earrings
  const earringsData = await shopifyGraphQL(GetAllEarrings);
  const earrings = earringsData.metaobjects?.nodes || [];

  // Fetch rings
  const ringsData = await shopifyGraphQL(GetAllRings);
  const rings = ringsData.metaobjects?.nodes || [];

  // Fetch organiser boxes
  const organiserBoxData = await shopifyGraphQL(GetAllOrganiserBox);
  const organiserBoxes = organiserBoxData.metaobjects?.nodes || [];

  // Fetch client video reviews
  const clientVideoReviewData = await shopifyGraphQL(clientVideoReviewQuery);
  const clientVideoReviews =
    clientVideoReviewData.metaobjects?.nodes[0] || null;

  // Shop by design data
  const shopByDesignData = await shopifyGraphQL(shopByDesignQuery);
  const shopByDesign = shopByDesignData?.metaobjects?.nodes[0] ?? null;

  // Shop by occasion data
  const shopByOccasionData = await shopifyGraphQL(shopByOccasionQuery);
  const shopByOccasion = shopByOccasionData?.metaobjects?.nodes[0] ?? null;

  // Gifting Guide
  const shopByGiftingGuideData = await shopifyGraphQL(shopByGiftingGuide);
  const giftingGuideData =
    shopByGiftingGuideData?.metaobjects?.nodes[0] ?? null;

  // Why Elinor Jewels
  const whyElinorJewelsData = await shopifyGraphQL(whyElinorJewelsQuery);
  const whyElinorJewels = whyElinorJewelsData?.metaobjects?.nodes?.[0] || null;

  return {
    collections,
    offerBanner,
    heroBanner,
    shopCategories,
    celebPicks,
    customerReviews,
    newCollections,
    earrings,
    rings,
    organiserBoxes,
    clientVideoReviews,
    shopByDesign,
    shopByOccasion,
    giftingGuideData,
    whyElinorJewels,
  };
}

export function meta() {
  return [
    { title: "Elinor Jewels" },
    { name: "description", content: "Welcome to Elinor Jewels!" },
  ];
}

export default function Home() {
  const {
    collections,
    offerBanner,
    heroBanner,
    shopCategories,
    celebPicks,
    customerReviews,
    newCollections,
    earrings,
    rings,
    organiserBoxes,
    clientVideoReviews,
    shopByDesign,
    shopByOccasion,
    giftingGuideData,
    whyElinorJewels,
  } = useLoaderData();

  return (
    <>
      <Collection heroCollection={collections} />
      <OffersBanners offerBanner={offerBanner} />
      <Hero heroBanner={heroBanner} />
      {/* <TrustedPartner /> */}
      <ShopByCategories shopCategories={shopCategories} />
      <CelebPicks celebPicks={celebPicks} />
      <Customers clientVideos={clientVideoReviews} />
      <Tagline customerReviews={customerReviews} />
      <ProductCollections collectionsData={newCollections} />
      <ProductCollections collectionsData={earrings} />
      <ProductCollections collectionsData={rings} /> 
      <ProductCollections collectionsData={organiserBoxes} />
      <ShopByDesign shopByDesign={shopByDesign} />
      <ShopByOccasion shopByOccasion={shopByOccasion} />
      <GiftingGuide data={giftingGuideData} />
      <WhyElinorJewels whyElinorJewels={whyElinorJewels} />
      <NewsletterForm />
    </>
  );
}
