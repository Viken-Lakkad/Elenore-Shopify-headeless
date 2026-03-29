import { ContactUs } from "../components/ContactUs";

export function meta() {
  return [
    { title: "Contact Us" },
    { name: "description", content: "Contact Us to Elinor Jewels" },
  ];
}

export default function contactus() {
  return (
    <>
      <ContactUs />
    </>
  );
}
 