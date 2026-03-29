import Wishlist from "../components/Wishlist";

export function meta() {
  return [
    { title: "Wishlist" },
    { name: "description", content: "Wishlist pages" },
  ];
}

export default function wishlist() {
  return (
    <>
      <Wishlist />
    </>
  );
}
