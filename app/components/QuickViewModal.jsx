import { Link } from "react-router";

const TruckIcon = () => (
  <svg
    className="w-5 h-5 shrink-0 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
    />
  </svg>
);

const FEATURES = [
  { icon: "🔶", label: "18k Gold Plated" },
  { icon: "🛡️", label: "Skin Safe Jewellery" },
  { icon: "💧", label: "Waterproof Jewellery" },
  { icon: "✨", label: "Anti Tarnishing" },
];

const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const hasDiscount = parseFloat(product.compareAt) > parseFloat(product.price);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl flex overflow-hidden w-full max-w-5xl h-full max-h-[60vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl leading-none z-10"
        >
          ×
        </button>

        {/* Image */}
        <div className="shrink-0 bg-[#f5f0e8] flex-1 items-center justify-center p-6">
          {product.image ? (
            <img
              src={product.image}
              alt={product.altText}
              className="w-full object-contain h-full"
            />
          ) : (
            <div className="text-gray-300 text-sm">No Image</div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col p-6 flex-1 gap-3 overflow-y-auto">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              {product.title}
            </h2>
            {product.material && (
              <p className="text-sm text-gray-400 mt-0.5">{product.material}</p>
            )}
          </div>

          <div>
            {hasDiscount && (
              <div className="flex items-center gap-3 mb-1">
                <p className="text-sm text-gray-400 line-through">
                  ₹{parseFloat(product.compareAt).toFixed(2)}
                </p>
                <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded">
                  {product.discountPercent}% OFF
                </span>
              </div>
            )}
            <p className="text-xl font-bold text-gray-900">
              ₹{parseFloat(product.price).toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-base tracking-tight">
              ★★★★★
            </span>
            <span className="text-sm text-gray-500">
              1,000+ Happy Customers
            </span>
          </div>

          <button
            onClick={() => {
              onAddToCart?.(product);
              onClose();
            }}
            className="w-full bg-[#6b2737] hover:bg-[#5a1f2e] text-white text-sm font-bold tracking-widest uppercase py-3.5 rounded-md transition-colors"
          >
            Add to Cart
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <TruckIcon />
            <span>
              Dispatched within <strong>24 hours!</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 pt-1 border-t border-gray-100">
            {FEATURES.map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-base">{icon}</span>
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>

          <Link
            to={`/products/${product.handle}`}
            onClick={onClose}
            className="text-xs text-center text-gray-400 underline underline-offset-2 hover:text-gray-600"
          >
            View full details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
