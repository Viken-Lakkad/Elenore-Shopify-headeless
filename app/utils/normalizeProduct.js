// utils/normalizeProduct.js
export const normalizeProduct = (shopifyProduct) => {
  const price = shopifyProduct.priceRange?.minVariantPrice?.amount ?? "0";
  const compareAt = shopifyProduct.priceRange?.maxVariantPrice?.amount ?? "0";
  const discountPercent =
    parseFloat(compareAt) > parseFloat(price)
      ? Math.round(
          ((parseFloat(compareAt) - parseFloat(price)) /
            parseFloat(compareAt)) *
            100,
        )
      : 0;

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    image: shopifyProduct.featuredImage?.url ?? null,
    altText: shopifyProduct.featuredImage?.altText ?? shopifyProduct.title,
    price,
    compareAt,
    discountPercent,
  };
};
