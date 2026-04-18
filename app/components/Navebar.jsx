import { useState, useEffect } from "react";
import { Link, NavLink, useRouteLoaderData } from "react-router";
import { SearchIcon } from "../Icons/SearchIcon";
import { CartIcon } from "../Icons/CartIcon";
import { HeartIcon } from "../Icons/HeartIcon";
import { UserIcon } from "../Icons/UserIcon";
import { DropDown } from "../Icons/DropDown";
import { Menu } from "../Icons/Menu";
import { Divider } from "./Divider";
import { useCart } from "../context/CartContext";

const logo = "/Logo.png";

// ─── Mobile Sidebar ────────────────────────────────────────────────────────────
const MobileSidebar = ({ isOpen, onClose, mainMenu }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleAccordion = (url) =>
    setOpenAccordion((prev) => (prev === url ? null : url));

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full max-w-96 w-full bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" onClick={onClose}>
            <img src={logo} alt="logo" className="h-10" />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-black transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {mainMenu?.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = openAccordion === item.url;

            return (
              <div key={item.url}>
                {hasChildren ? (
                  <>
                    {/* Accordion trigger */}
                    <button
                      onClick={() => toggleAccordion(item.url)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span>{item.title}</span>
                      <span
                        className={`transition-transform duration-200 text-gray-400 ${
                          isExpanded ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </button>

                    {/* Accordion children */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="pl-4 mt-1 space-y-1 border-l-2 border-gray-100 ml-3">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.url}
                            to={child.url}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? "bg-black text-white font-medium"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
                              }`
                            }
                          >
                            {child.title}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink
                    to={item.url}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-black text-white"
                          : "text-gray-800 hover:bg-gray-50"
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-4">
          <div className="h-5 w-5 cursor-pointer text-gray-600">
            <SearchIcon />
          </div>
          <div className="h-5 w-5 cursor-pointer text-gray-600">
            <UserIcon />
          </div>
          <div className="h-5 w-5 cursor-pointer text-gray-600">
            <HeartIcon />
          </div>
        </div>
      </aside>
    </>
  );
};

// ─── Cart Drawer ────────────────────────────────────────────────────────────────
const CartDrawer = ({ isOpen, onClose }) => {
  const { cart } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const items = cart?.lines?.edges?.map((e) => e.node) || [];
  const subtotal = cart?.cost?.subtotalAmount;

  return (
    <>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40" />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[400px] max-w-[90vw] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold tracking-wide">
            Your Cart {cart?.totalQuantity > 0 && `(${cart.totalQuantity})`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <p className="text-sm">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-sm underline text-black"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img
                  src={item.merchandise.image?.url}
                  alt={item.merchandise.product.title}
                  className="h-20 w-20 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.merchandise.product.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {item.merchandise.title}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {item.merchandise.price.currencyCode}{" "}
                    {parseFloat(item.merchandise.price.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t space-y-3">
          {subtotal && (
            <div className="flex justify-between text-sm font-medium">
              <span>Subtotal</span>
              <span>
                {subtotal.currencyCode} {parseFloat(subtotal.amount).toFixed(2)}
              </span>
            </div>
          )}
          <p className="text-xs text-gray-400">
            Shipping & taxes calculated at checkout
          </p>
          {cart?.checkoutUrl ? (
            <a
              href={cart.checkoutUrl}
              className="block w-full bg-black text-white py-3 rounded-md text-sm font-semibold text-center hover:bg-gray-800 transition-colors"
            >
              Checkout
            </a>
          ) : (
            <button
              disabled
              className="w-full bg-gray-200 text-gray-400 py-3 rounded-md text-sm cursor-not-allowed"
            >
              Checkout
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full border border-black text-black py-3 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

// ─── Navbar ─────────────────────────────────────────────────────────────────────
export const Navebar = () => {
  const { mainMenu } = useRouteLoaderData("root");
  const { isCartOpen, setIsCartOpen, cart } = useCart();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between lg:container m-auto py-3 px-1.5">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-2">
          <button
            className="h-6 w-6 cursor-pointer lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 md:h-12 lg:h-16" />
          </Link>
        </div>

        {/* Center: Desktop nav links */}
        <div className="items-center gap-4 hidden lg:flex">
          {mainMenu?.map((item) => (
            <div
              key={item.url}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.url)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <NavLink
                to={item.url}
                className={`text-plusjakarta hover:text-primary transition-colors ${
                  item.children && "cursor-pointer flex items-center gap-1"
                }`}
              >
                {item.title}
                {item.children && (
                  <span className="ml-1 h-8 w-8 text-base">
                    <DropDown />
                  </span>
                )}
              </NavLink>

              {item.children && openDropdown === item.url && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 z-50 min-w-[160px]">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.url}
                      to={child.url}
                      className="block px-4 py-2 text-sm text-plusjakarta hover:bg-gray-100 transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="h-5 w-5 cursor-pointer">
            <SearchIcon />
          </div>
          <div className="h-5 w-5 cursor-pointer">
            <UserIcon />
          </div>
          <Link to="/wishlist" className="h-5 w-5 cursor-pointer">
            <HeartIcon />
          </Link>
          <div
            className="h-5 w-5 cursor-pointer relative"
            onClick={() => setIsCartOpen(true)}
          >
            <CartIcon />
            {cart?.totalQuantity > 0 && (
              <span className="absolute -top-2 right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cart.totalQuantity}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        mainMenu={mainMenu}
      />

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <Divider />
    </>
  );
};
