import { useLoaderData } from "react-router";
import { shopifyGraphQL } from "../utils/shopify-admin";
import { collectionByHandleQuery } from "../graphql/queries/Queries";
import ProductCard from "../components/ProductCard";

export async function loader({ params }) {
  const { handle } = params;

  const data = await shopifyGraphQL(collectionByHandleQuery, { handle });
  const collection = data?.collectionByHandle;

  if (!collection) {
    throw new Response("Collection Not Found", { status: 404 });
  }

  return {
    collection: {
      id: collection.id,
      title: collection.title,
      description: collection.description,
      image: collection.image?.url || null,
      products: collection.products.edges.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        image: edge.node.featuredImage?.url || null,
        altText: edge.node.featuredImage?.altText || edge.node.title,
        price: edge.node.priceRange.minVariantPrice.amount,
        currency: edge.node.priceRange.minVariantPrice.currencyCode,
      })),
    },
  };
}

export function meta({ data }) {
  return [
    { title: data?.collection?.title || "Collection" },
    { name: "description", content: data?.collection?.description || "" },
  ];
}

export default function CollectionPage() {
  const { collection } = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Collection Header */}
      <div className="mb-8 text-center">
        {collection.image && (
          <img
            src={collection.image}
            alt={collection.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        )}
        <h1 className="text-3xl font-semibold">{collection.title}</h1>
        {collection.description && (
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            {collection.description}
          </p>
        )}
      </div>

      {/* Products Grid */}
      {collection.products.length === 0 ? (
        <p className="text-center text-gray-400">
          No products in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {collection.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}