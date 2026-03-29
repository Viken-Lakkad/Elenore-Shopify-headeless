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
  newArrivalQuery,
  earRingsQuery,
  ringsQuery,
  jewelleryOrganiserBoxQuery,
  clientVideoReviewQuery,
  shopByDesignQuery,
  shopByOccasionQuery,
  shopByGiftingGuide,
} from "../graphql/queries/Queries";

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
  const newArrivalData = await shopifyGraphQL(newArrivalQuery);
  const newArrivals = newArrivalData.metaobjects?.nodes?.[0] || null;

  // organiser Box
  const organiserData = await shopifyGraphQL(jewelleryOrganiserBoxQuery);
  const organiserBox = organiserData.metaobjects?.nodes?.[0] || null;

  // Fetch rings collection
  const ringsData = await shopifyGraphQL(ringsQuery);
  const rings = ringsData.metaobjects?.nodes?.[0] || null;

  // Fetch earRings collection
  const earRingsData = await shopifyGraphQL(earRingsQuery);
  const earRings = earRingsData.metaobjects?.nodes?.[0] || null;

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

  return {
    collections,
    offerBanner,
    heroBanner,
    shopCategories,
    celebPicks,
    customerReviews,
    newArrivals,
    earRings,
    rings,
    organiserBox,
    clientVideoReviews,
    shopByDesign,
    shopByOccasion,
    giftingGuideData,
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
    newArrivals,
    earRings,
    rings,
    organiserBox,
    clientVideoReviews,
    shopByDesign,
    shopByOccasion,
    giftingGuideData,
  } = useLoaderData();

  // console.log("GiftingGuide-->",GiftingGuide);

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
      <NewArrival newArrivals={newArrivals} />
      <Earrings earRings={earRings} />
      <Rings rings={rings} />
      <OrganiserBox organiserBox={organiserBox} />
      <ShopByDesign shopByDesign={shopByDesign} />
      <ShopByOccasion shopByOccasion={shopByOccasion} />
      <GiftingGuide data={giftingGuideData} />
       <WhyElinorJewels />
    </>
  );
}
