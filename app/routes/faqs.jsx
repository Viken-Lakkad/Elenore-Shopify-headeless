import { Faqs } from "../components/Faqs";

export function meta() {
  return [{ title: "Faqs" }, { name: "description", content: "Faqs pages" }];
}

export default function faqs() {
  return (
    <>
      <Faqs />
    </>
  );
}
