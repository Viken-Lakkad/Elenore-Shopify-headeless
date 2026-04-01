// components/Footer.jsx
import { Link } from "react-router";
import { Twitter } from "../Icons/Twitter";
import { Instagram } from "../Icons/Instagram";
import { Facebook } from "../Icons/Facebook";

const categories = [
  { label: "New Arrival", handle: "new-arrival" },
  { label: "Best Seller", handle: "best-seller" },
  { label: "Bracelets", handle: "bracelets" },
  { label: "Earrings", handle: "earrings" },
  { label: "Necklace", handle: "necklace" },
  { label: "Rings", handle: "rings" },
];

const supportLinks = [
  { label: "FAQs", path: "/faqs" },
  { label: "Jewellery Care", path: "/jewellery-care" },
  { label: "Shipping & Delivery", path: "/shipping" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "About Us", path: "/about" },
  { label: "Terms & Conditions", path: "/terms" },
];

const socialLinks = [
  { label: "X", icon: <Twitter />, url: "#" },
  { label: "Instagram", icon: <Instagram />, url: "#" },
  { label: "Facebook", icon: <Facebook />, url: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-white px-1.5 pt-12 pb-6">
      <div className="container mx-auto">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
          {/* LEFT */}
          <div>
            <img
              src="https://cdn.shopify.com/s/files/1/0644/0452/1021/files/Elinor_Handover_-_Final_logo_Color-11_1.png"
              alt="Logo"
              className="h-16 mb-5"
            />

            <p className="text-base sm:text-lg font-bold tracking-widest mb-3">
              ELINOR ENTERPRISE
            </p>

            <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">
              Our Elinor Jewels pieces are curated especially for women by women
              for everyday use; quite simply because "luxury should be a habit,
              not a rarity."
            </p>

            <p className="text-sm sm:text-base text-white/70">
              Call US :{" "}
              <a href="tel:7600459583" className="font-semibold text-white">
                7600459583
              </a>
            </p>

            <p className="text-sm sm:text-base text-white/70">
              Reach out us :{" "}
              <a
                href="mailto:support@elinorjewels.com"
                className="font-semibold text-white"
              >
                support@elinorjewels.com
              </a>
            </p>
          </div>

          {/* CATEGORIES */}
          <div>
            <p className="text-base sm:text-lg font-bold tracking-widest mb-5">
              CATEGORIES
            </p>

            <ul className="flex flex-wrap gap-x-2 gap-y-2 sm:block sm:space-y-3">
              {categories.map((cat, i) => (
                <li key={cat.handle} className="flex items-center">
                  <Link
                    to={`/collections/${cat.handle}`}
                    className="text-sm sm:text-base hover:text-white/60"
                  >
                    {cat.label}
                  </Link>

                  {i !== categories.length - 1 && (
                    <span className="mx-2 sm:hidden text-white/40">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <p className="text-base sm:text-lg font-bold tracking-widest mb-5">
              SUPPORT
            </p>

            <ul className="flex flex-wrap gap-x-2 gap-y-2 sm:block sm:space-y-3">
              {supportLinks.map((link, i) => (
                <li key={link.path} className="flex items-center">
                  <Link
                    to={link.path}
                    className="text-sm sm:text-base hover:text-white/60"
                  >
                    {link.label}
                  </Link>

                  {i !== supportLinks.length - 1 && (
                    <span className="mx-2 sm:hidden text-white/40">|</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <p className="text-base sm:text-lg font-bold mb-5">
              SHOW US SOME LOVE ♥ <br />
              ON SOCIAL MEDIA
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center  rounded-lg"
                >
                  <span className="w-8 h-8 text-white">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/60 pt-4 text-center text-xs sm:text-sm text-white/80 rounded-3xl">
          © {new Date().getFullYear()} Elinor Jewels. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
