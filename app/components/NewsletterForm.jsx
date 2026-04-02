import { useFetcher } from "react-router";
import { useEffect, useRef } from "react";

export const NewsletterForm = () => {
  const fetcher = useFetcher();
  const inputRef = useRef(null);

  const isLoading = fetcher.state !== "idle";
  const result = fetcher.data; // { success, message } from action

  // Clear input on success
  useEffect(() => {
    if (result?.success && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [result]);

  return (
    <section>
      <div className=" pt-8 pb-2 md:pt-16 md:pb-8 relative bg-[#FFF7EF] NewsletterForm">
        <div className="container m-auto px-1.5 ">
          <div className="w-full relative z-10 bg-linear-to-r from-[#6B1F3D] to-[#8B2F4D] rounded-3xl px-8 py-10 md:py-12 md:px-16 border border-accent">
            {/* useFetcher.Form — posts to the current route's action */}
            <fetcher.Form
              method="post"
              className="flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-8"
            >
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold whitespace-nowrap">
                Subscribe to Our Newsletter
              </h2>

              <div className="flex flex-col w-full max-w-2xl gap-2">
                <div className="flex w-full gap-4">
                  <input
                    ref={inputRef}
                    type="email"
                    name="email" // ← action reads formData.get("email")
                    placeholder="Enter your e-mail"
                    required
                    disabled={isLoading}
                    className="flex-1 w-full px-8 py-3 md:py-5 rounded-full text-gray-700
                               text-lg placeholder:text-gray-400 bg-[#FFF7EF] transition-all
                               disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#F5D4D4] hover:bg-[#FFF7EF] p-5 rounded-full transition-all
                               duration-300 hover:scale-105 active:scale-95 focus:outline-none
                               focus:ring-4 focus:ring-pink-300 flex-shrink-0
                               disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-label="Subscribe"
                  >
                    {isLoading ? (
                      <svg
                        className="w-7 h-7 text-[#6B1F3D] animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-7 h-7 text-[#6B1F3D]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Feedback from action */}
                {result?.message && (
                  <p
                    className={`text-sm px-2 ${result.success ? "text-green-300" : "text-red-300"}`}
                  >
                    {result.success ? "✓ " : "✗ "}
                    {result.message}
                  </p>
                )}
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </section>
  );
};
