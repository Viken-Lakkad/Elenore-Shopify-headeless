import { About } from "../components/About";

export function meta() {
  return [{ title: "About Us" }, { name: "description", content: "About Us" }];
}

export default function wishlist() {
  return (
    <>
      <About />
    </>
  );
}
