import { useCallback } from "react";
import ProductCard from "./ProductCard";
import { normalizeProduct } from "../utils/normalizeProduct";

const ProductCollections = ({ collectionsData }) => {
  const handleAddToCart = useCallback((product) => {
  }, []);

  return (
    <>
      {collectionsData?.map((collection) => {
        const title = collection?.title?.value;
        const products = collection?.products?.references?.nodes ?? [];

        return (
          <section key={collection.id} className="py-8" aria-label={title}>
            <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0">
              {title}
            </h2>
            <div className="pt-6 px-1.5 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:container m-auto">
              {products.map((shopifyProduct, index) => {
                const product = normalizeProduct(shopifyProduct);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    priority={index === 0} // first card = potential LCP
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
};

export default ProductCollections;
