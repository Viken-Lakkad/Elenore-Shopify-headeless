import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import "./app.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navebar } from "./components/Navebar";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { shopifyGraphQL } from "./utils/shopify-admin";
import { CartProvider } from "./context/CartContext";
import { Footer } from "./components/Footer";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader() {
  try {
    const data = await shopifyGraphQL(`
        query {
          shop {
            announcementBar: metafield(namespace: "custom", key: "announcement_bar") {
              value
            }
            mainMenu: metafield(namespace: "custom", key: "main_menu") {
              value
            }
          }
        }
      `);

    const announcementRaw = data?.shop?.announcementBar?.value;
    const mainMenuRaw = data?.shop?.mainMenu?.value;

    return {
      announcements: announcementRaw ? JSON.parse(announcementRaw) : [],
      mainMenu: mainMenuRaw ? JSON.parse(mainMenuRaw) : [],
    };
  } catch (error) {
    console.error("Root loader error:", error);
    return {
      announcements: [],
      mainMenu: [],
    };
  }
}

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { announcements } = useLoaderData();
  return (
    <>
      <CartProvider>
        <AnnouncementBar announcements={announcements} />
        <Navebar />
        <Outlet />
        <Footer />
      </CartProvider>
    </>
  );
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
