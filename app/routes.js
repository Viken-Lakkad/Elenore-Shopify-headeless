import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("collections/:handle", "routes/collection.jsx"),
  route("products/:handle", "routes/product.jsx"),
  route("wishlist", "routes/wishlist.jsx"),
  route("contactus", "routes/contactus.jsx"),
  route("partnerships", "routes/partnerships.jsx"),
  route("shop-policy", "routes/ShopPolicy.jsx"),
  route("return-and-refund", "routes/ReturnAndRefund.jsx"),
  route("terms-of-service", "routes/TermsOfService.jsx"),
  route("privacy-policy", "routes/PrivacyPolicy.jsx"),
  route("faqs", "routes/faqs.jsx"),
  route("about", "routes/about.jsx"),
  route("api/cart", "routes/api.cart.jsx"), // ← add this
];
