export const heroCollectionQuery = `
  query GetHeroCollection{
    shop {
      heroCollection: metafield(namespace: "custom", key: "collection_list") {
        value
      }
    }
}`;

export const collectionsByIdsQuery = (ids) => `
  query {
    nodes(ids: ${JSON.stringify(ids)}) {
      ... on Collection {
        id
        title
        handle
        image {
          url
        }
      }
    }
  }
`;

export const collectionByHandleQuery = `
  query CollectionByHandle(
    $handle: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      products(first: $first, last: $last, after: $after, before: $before) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          node {
            id
            title
            handle
            productType
            tags
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            options {
              name
              values
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  }
`;

export const productByHandleQuery = `
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      vendor
      tags
      featuredImage {
        url
        altText
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export const offerBannerQuery = `
  query GetOfferBanner {
     metaobjects(type: "offer_banner", first: 5) {
    nodes {
      id
      
      title: field(key: "offer_title") {
        value
      }

      discount: field(key: "discount_text") {
        value
      }

      buttonLabel: field(key: "button_label") {
        value
      }

      buttonLink: field(key: "button_link") {
        value
      }
    } 
   } 
  }
`;

export const heroBannerQuery = `
query HeroBanner {
  metaobjects(type: "hero_banner", first: 1) {
    nodes {
      id
      heading: field(key: "heading") {
        value
      }
      discount: field(key: "discount") {
        value
      }
      buttonLabel: field(key: "button_label") {
        value
      }
      buttonLink: field(key: "button_link") {
        value
      }
      leftImage: field(key: "left_image") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      centerImage: field(key: "center_image") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      rightImage: field(key: "right_image") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
    }
  }
}
`;

export const shopCategoriesQuery = `
query ShopCategories {
  metaobjects(type: "shop_category", first: 10) {
    nodes {
      id

      title: field(key: "title") {
        value
      }

      image: field(key: "image") {
        reference {
          ... on MediaImage {
            image {
              url(transform: { maxWidth: 600 })
            }
          }
        }
      }

      collection: field(key: "collection") {
        reference {
          ... on Collection {
            handle
          }
        }
      }
    }
  }
}
`;

export const customerReviewsQuery = `
  query CustomerReviews {
    metaobjects(type: "customer_review", first: 1) {
      nodes {
        id
        reviewText: field(key: "review_text") {
          value
        }
        reviewerName: field(key: "customer_name") {
          value
        }
      }
    }
  }
`;

// Celeb Picks
export const celebPicksQuery = `
  query CelebPicks {
    metaobjects(type: "celeb_picks", first: 1) {
      nodes {
        id
        title: field(key: "title") {
          value
        }
        images: field(key: "images") {
          references(first: 10) {
            nodes {
              ... on MediaImage {
                image {
                  url(transform: { maxWidth: 600 })
                }
              }
            }
          }
        }
      }
    }
  }`;

// New Arrivals Query
export const GetAllNewArrivals = `{
  metaobjects(type: "new_arrival", first: 1) {
    nodes {
      id
      handle
      title: field(key: "title") {
        value
      }
      products: field(key: "productes") {
        references(first: 4) {
          nodes {
            ... on Product {
              id
              title
              handle
              featuredImage {
                url
                altText
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
}`;


// Custome video review query
export const clientVideoReviewQuery = `
  query CustomerVideoReviews {
    metaobjects(type: "customer_reviews_with_video", first: 1) {
      nodes {
        id

        starReviews: field(key: "star_reviews") {
          value
        }

        title: field(key: "title") {
          value
        }

        reviewsVideo: field(key: "reviews_video") {
          references(first: 10) {
            nodes {
            ... on Video {          # ✅ Changed from MediaVideo → Video
                sources {
                  url
                  mimeType
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Shopbydesign query
export const shopByDesignQuery = `
  query ShopByDesign {
    metaobjects(type:"shop_by_design", first: 1) {
      nodes {
        id

        title: field(key: "section_title") {
          value
        }

        card: field(key: "cards") {
        references(first: 10) {
            nodes {
              ... on Metaobject {
                title: field(key: "title") {
                  value
                }
                subtitle: field(key: "subtitle") {
                  value
                }
                image: field(key: "image") {
                  reference {
                    ... on MediaImage {
                      image {
                        url
                        altText
                      }
                    }
                  }
                }

                link: field(key: "Iink") {
                  reference {
                    ... on Collection {
                      id
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Shop by Occasion
export const shopByOccasionQuery = `
  query ShopByOccasion {
    metaobjects(type:"shop_by_occasion", first: 1) {
      nodes {
        id

        title: field(key: "section_title") {
          value
        }
        button: field(key: "section_buttion") {
          value
        }
        
        url: field(key: "section_buttion_url") {
          reference {
            ... on Collection {
              id
              title
              handle
            }
          }
        }

        card: field(key: "cards") {
        references(first: 10) {
            nodes {
              ... on Metaobject {
                title: field(key: "card_title") {
                  value
                }
                image: field(key: "card_image") {
                  reference {
                    ... on MediaImage {
                      image {
                        url
                        altText
                      }
                    }
                  }
                }

                link: field(key: "card_url") {
                  reference {
                    ... on Collection {
                      id
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        }
      }
    }  
  }
`;

// Shop by Occasion

export const shopByGiftingGuide = `
  query shopByGiftingGuide {
    metaobjects(type:"elinor_gifting_guide", first: 1) {
      nodes {
        id
      
        title: field(key: "section_title") {
          value
        } 

        card: field(key: "cards") {  
          references(first: 10) {
            nodes {
              ... on Metaobject {

              image: field(key: "image") {
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }

              collection: field(key: "collection") {
                  reference {
                    ... on Collection {
                      id
                      title
                      handle
                    }
                  }
                }
              }
            }
          }
        } 
      }
    } 
  }
`;

// WhyElinorJewels Choose Elinor query

export const whyElinorJewelsQuery = `
  query WhyElinorJewels {
    metaobjects(type: "why_us", first: 1) {
      nodes {
        id
        handle

        subtitle: field(key: "subtitle") {
          value
        }

        title: field(key: "title") {
          value
        }

        cards: field(key: "cards") {
          references(first: 10) {
            nodes {
              ... on Metaobject {
                id
                handle

                cardTitle: field(key: "lable") {
                  value
                }

                cardImage: field(key: "images") {
                  reference {
                    ... on MediaImage {
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Shop Policy

export const shippingPolicyQuery = `
  query {
    shop {
      shippingPolicy {
        title
        body
      }
    }
  }
`;

export const returnPolicyQuery = `
  query {
    shop {
      refundPolicy {
        title
        body
      }
    }
  }
`;

export const termsPolicyQuery = `
  query {
    shop {
      termsOfService {
        title
        body
      }
    }
  }
`;

export const privacyPolicyQuery = `
  query {
    shop {
      privacyPolicy {
        title
        body
      }
    }
  }
`;

// About us
export const aboutUsBenaerQuery = `
  query AboutUsBenaer {
    metaobjects(type: "about_us_benaer", first: 1) {
      nodes {
        id

        title: field(key: "title") {
          value
        } 

        benaer: field(key: "benaer") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
      }
    }  
}`;

export const getOurStoryQuery = `
  query GetOurStory { 
    metaobjects(type: "our_story", first: 1) {
     nodes {
        id
        title: field(key: "story_title") {
          value
        }
        image: field(key: "story_image") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
        paragraphs: field(key: "story_paragraphs") {
          value
        }
      }
    }
  }
`;

export const getOurDesignsQuery = `
  query GetOurDesigns {
    metaobjects(type: "our_designs", first: 1) {
      nodes {
        id
        title: field(key: "title") {
          value
        }
        images: field(key: "images") {
          references(first: 10) {
            nodes {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getOurPromiseQuery = `
  query GetOurPromise {
    metaobjects(type: "our_promise", first: 1) {
      nodes {
        id
        title: field(key: "title") {
          value
        }
        paragraphs: field(key: "paragraphs") {
          value
        }
        buttonLabel: field(key: "button_label") {
          value
        }
        buttonLink: field(key: "button_link") {
          value
        }
        mainImage: field(key: "main_image") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
        sideImage1: field(key: "side_image_1") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
        sideImage2: field(key: "side_image_2") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
              }
            }
          }
        }
        promiseFeatures: field(key: "promise_features") {
          references(first: 10) {
            nodes {
              ... on Metaobject {
                label: field(key: "label") {
                  value
                }
                icon: field(key: "icon") {
                  reference {
                    ... on MediaImage {
                      image {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Elinor Partnerships

export const getElinorPartnershipsQuery = `
  query GetElinorPartnerships {
    metaobjects(type: "elinor_partnerships", first: 1) {
      nodes {
        id
        title: field(key: "title") {
          value
        }
        images: field(key: "images") {
          references(first: 10) {
            nodes {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;
