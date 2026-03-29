import { Link } from "react-router";
import { Facebook } from "../Icons/Facebook";
import { Twitter } from "../Icons/Twitter";
import { Linkedin } from "../Icons/Linkedin.jsx";
import { Contactform } from "./Contactform.jsx";

export const ContactUs = () => {
  return (
    <>
      <div className="py-6">
        <h2 className="text-center font-streamline text-5xl">Contact Us</h2>
        <p className="mt-1 text-center max-w-4/12 m-auto text-[#898B8E]">
          Our Elinor Jewels pieces are curated especially for women by women for
          everyday use; quite simply because “luxury should be a habit, not a
          rarity.”
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Link to="/" className=" p-2 border rounded-full border-[#171111]">
            <div className="w-4 h-4">
              <Facebook />
            </div>
          </Link>
          <Link to="/" className=" p-2 border rounded-full border-[#171111]">
            <div className="w-4 h-4">
              <Twitter />
            </div>
          </Link>
          <Link to="/" className=" p-2 border rounded-full border-[#171111]">
            <div className="w-4 h-4">
              <Linkedin />
            </div>
          </Link>
        </div>
      </div>

      <div>
        <Contactform title="How can we help you?" description="Connect with Elinore to tell us more" />
      </div>
    </>
  );
};
