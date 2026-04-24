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
import { WhyElinorJewels } from "../components/WhyElinorJewels";
import { NewsletterForm } from "../components/NewsletterForm";
import ProductCollections from "../components/ProductCollections";

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
import { subscribeNewsletterMutation } from "../graphql/mutations/mutations";
const safeParse = (str, fallback) => {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
};

export function meta() {
  return [
    { title: "Elinor Jewels — Handcrafted Jewellery for Every Occasion" },
    {
      name: "description",
      content:
        "Shop Elinor Jewels for handcrafted rings, earrings, and gifting collections. Celeb-loved designs delivered across India.",
    },
  ];
}

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
        password: crypto.randomUUID(),
      },
    });

    const { customerUserErrors } = data.customerCreate;

    if (customerUserErrors?.length > 0) {
      const alreadyExists = customerUserErrors.some((e) => e.code === "TAKEN");
      if (alreadyExists) {
        return { success: true, message: "You're already subscribed! 🎉" };
      }
      return { success: false, message: customerUserErrors[0].message };
    }

    return { success: true, message: "You're subscribed! 🎉" };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function loader() {
  const metafieldData = await shopifyGraphQL(heroCollectionQuery);
  const ids = safeParse(metafieldData.shop.heroCollection.value, []);
  const [
    collectionsData,
    offerBannerData,
    heroBannerData,
    shopCategoriesData,
    celebPicksData,
    customerReviewsData,
    newCollectionsData,
    earringsData,
    ringsData,
    organiserBoxData,
    clientVideoReviewData,
    shopByDesignData,
    shopByOccasionData,
    shopByGiftingGuideData,
    whyElinorJewelsData,
  ] = await Promise.all([
    shopifyGraphQL(collectionsByIdsQuery(ids)),
    shopifyGraphQL(offerBannerQuery),
    shopifyGraphQL(heroBannerQuery),
    shopifyGraphQL(shopCategoriesQuery),
    shopifyGraphQL(celebPicksQuery),
    shopifyGraphQL(customerReviewsQuery),
    shopifyGraphQL(GetAllNewArrivals),
    shopifyGraphQL(GetAllEarrings),
    shopifyGraphQL(GetAllRings),
    shopifyGraphQL(GetAllOrganiserBox),
    shopifyGraphQL(clientVideoReviewQuery),
    shopifyGraphQL(shopByDesignQuery),
    shopifyGraphQL(shopByOccasionQuery),
    shopifyGraphQL(shopByGiftingGuide),
    shopifyGraphQL(whyElinorJewelsQuery),
  ]);

  const collections = collectionsData.nodes.filter(Boolean).map((col) => ({
    id: col.id,
    title: col.title,
    handle: col.handle,
    image: col.image?.url || null,
    linkUrl: `/collections/${col.handle}`,
  }));

  return {
    collections,
    offerBanner: offerBannerData.metaobjects?.nodes || [],
    heroBanner: heroBannerData.metaobjects?.nodes?.[0] ?? null,
    shopCategories: shopCategoriesData.metaobjects?.nodes || [],
    celebPicks: celebPicksData.metaobjects?.nodes?.[0] ?? null,
    customerReviews: customerReviewsData.metaobjects?.nodes || [],
    newCollections: newCollectionsData.metaobjects?.nodes || [],
    earrings: earringsData.metaobjects?.nodes || [],
    rings: ringsData.metaobjects?.nodes || [],
    organiserBoxes: organiserBoxData.metaobjects?.nodes || [],
    clientVideoReviews: clientVideoReviewData.metaobjects?.nodes[0] ?? null,
    shopByDesign: shopByDesignData?.metaobjects?.nodes[0] ?? null,
    shopByOccasion: shopByOccasionData?.metaobjects?.nodes[0] ?? null,
    giftingGuideData: shopByGiftingGuideData?.metaobjects?.nodes[0] ?? null,
    whyElinorJewels: whyElinorJewelsData?.metaobjects?.nodes?.[0] ?? null,
  };
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
