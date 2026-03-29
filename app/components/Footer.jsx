export const Footer = () => {
  return (
    <>
      <footer className="relative bg-black">
        <div className="Newsletter container py-20  m-auto ">
          <div className="flex items-center justify-between bg-linear-to-r  p-4 rounded-xl bg-gra border border-white">
            <p className="font-medium text-white text-2xl">
              Subscribe to Our Newsletter
            </p>
            <div>
              <form className="flex items-center gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail"
                  className="p-3 border border-white rounded-full"
                />
                <button className=" h-12 w-12 bg-[#FFEAE6] flex justify-center items-center rounded-full">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 13 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.31506 1.31543L11.1781 11.1784L1.31506 21.0415"
                      stroke="black"
                      strokeWidth="2.63014"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
