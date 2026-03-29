import { useState } from "react";
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

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart } = useCart();

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

export const Navebar = () => {
  const { mainMenu } = useRouteLoaderData("root");
  const { isCartOpen, setIsCartOpen, cart } = useCart(); // ← use cart context
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <>
      <nav className="flex items-center justify-between container m-auto py-3 px-1.5">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 cursor-pointer lg:hidden">
            <Menu />
          </div>
          <Link to="/">
            <img src={logo} alt="logo" className="h-10 md:h-12 lg:h-16" />
          </Link>
        </div>

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
          <div className="h-5 w-5 cursor-pointer">
            <HeartIcon />
          </div>

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

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Divider />
    </>
  );
};
