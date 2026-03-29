import { ElinorPartnerships } from "../components/ElinorPartnerships";

export function meta() {
  return [
    { title: "Elinor Partnerships" },
    { name: "description", content: "Elinor Partnerships" },
  ];
}

export default function partnerships() {
  return (
    <>
      <ElinorPartnerships />
    </>
  );
}
