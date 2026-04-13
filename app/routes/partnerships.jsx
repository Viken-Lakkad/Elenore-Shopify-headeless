import { Contactform } from "../components/Contactform";
import { Partnerships } from "../components/Partnerships";
import { shopifyGraphQL } from "../utils/shopify-admin";
import { getElinorPartnershipsQuery } from "../graphql/queries/Queries";
import { useLoaderData } from "react-router";
import { NewsletterForm } from "../components/NewsletterForm";
import {
  subscribeNewsletterMutation,
  contactFormMutation,
} from "../graphql/mutations/mutations";

export async function action({ request }) {
  const formData = await request.formData();
  const formType = formData.get("formType"); // ← identifies which form

  // ───── Newsletter Form ─────
  if (formType === "newsletter") {
    const email = formData.get("email");

    if (!email) {
      return { success: false, message: "Email is required." };
    }

    try {
      const data = await shopifyGraphQL(subscribeNewsletterMutation, {
        input: {
          email,
          acceptsMarketing: true,
          password: crypto.randomUUID(),
        },
      });

      const { customerUserErrors } = data.customerCreate;

      if (customerUserErrors?.length > 0) {
        const alreadyExists = customerUserErrors.some(
          (e) => e.code === "TAKEN",
        );
        if (alreadyExists) {
          return { success: true, message: "You're already subscribed! 🎉" };
        }
        return { success: false, message: customerUserErrors[0].message };
      }

      return { success: true, message: "You're subscribed! 🎉" };
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
      };
    }
  }

  // ───── Contact Form ─────
  if (formType === "contact") {
    const firstName = formData.get("First_Name");
    const lastName = formData.get("Last_Name");
    const email = formData.get("email");
    const companyName = formData.get("Company_Name");
    const message = formData.get("Message");

    if (!email || !firstName || !lastName || !message) {
      return {
        success: false,
        message: "Please fill in all required fields.",
        formType: "contact",
      };
    }

    try {
      const data = await shopifyGraphQL(contactFormMutation, {
        input: {
          firstName,
          lastName,
          email,
          acceptsMarketing: false,
          password: crypto.randomUUID(),
          note: `Company: ${companyName || "N/A"} | Message: ${message}`,
        },
      });

      const { customerUserErrors } = data.customerCreate;

      if (customerUserErrors?.length > 0) {
        const alreadyExists = customerUserErrors.some(
          (e) => e.code === "TAKEN",
        );
        if (alreadyExists) {
          return {
            success: true,
            message: "Message sent! We'll get back to you soon. 🎉",
            formType: "contact",
          };
        }
        return {
          success: false,
          message: customerUserErrors[0].message,
          formType: "contact",
        };
      }

      return {
        success: true,
        message: "Message sent! We'll get back to you soon. 🎉",
        formType: "contact",
      };
    } catch (err) {
      return {
        success: false,
        message: "Something went wrong. Please try again.",
        formType: "contact",
      };
    }
  }

  return { success: false, message: "Unknown form submission." };
}

export async function loader() {
  const partnershipsData = await shopifyGraphQL(getElinorPartnershipsQuery);
  const partnerships = partnershipsData.metaobjects?.nodes?.[0] || null;
  return { partnerships };
}

export function meta() {
  return [
    { title: "Elinor Partnerships" },
    { name: "description", content: "Elinor Partnerships" },
  ];
}

export default function partnerships() {
  const { partnerships } = useLoaderData();
  return (
    <>
      <Partnerships partnerships={partnerships} />
      <Contactform title="Connect with Elinore to tell us more" />
      <NewsletterForm />
    </>
  );
}
