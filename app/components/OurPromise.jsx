export const OurPromise = () => {
  return (
    <>
      <div className="container m-auto py-8 flex gap-2">
        <div className="w-8/12 flex">
          <div className="w-1/2 bg-[#FFEAE6] p-6 ">
            <h2 className="font-streamline text-5xl">Our Promise</h2>
            <p className="mt-2">
              Each piece is uniquely designed and carefully handcrafted.
            </p>

            <div className="mt-2">
              <p className="mt-3">
                We use only high-quality, ethically sourced materials, ensuring
                that each piece is durable and long-lasting.
              </p>
              <p className="mt-3">
                Every piece of jewelry is meticulously crafted by skilled
                artisans using the finest materials.
              </p>
            </div>
            <div className="mt-2">
              <button className="mt-3 cursor-pointer uppercase px-4 py-2 border border-black">
                Explore collection
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="OurPromise1.png"
              alt="OurPromise"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-4/12 flex flex-col justify-between">
          <div className="images_section flex gap-2">
            <img src="OurPromise2.png" alt="OurPromise2" className="w-1/2" />
            <img src="OurPromise3.png" alt="OurPromise3" className="w-1/2" />
          </div>

          <div>
            <div className="flex items-center justify-between py-2.5 border-b border-black/10">
              <p>Mindful Craftsmanship</p>
              <img src="WhyElinorJewels1.png" alt="WhyElinorJewels1" className="h-10 w-10" />
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-black/10">
              <p>Luxury for All</p>
              <img src="WhyElinorJewels4.png" alt="WhyElinorJewels1" className="h-10 w-10" />
            </div>
            <div className="flex items-center justify-between py-2.5 ">
              <p>A Timeless Choice</p>
              <img src="WhyElinorJewels3.png" alt="WhyElinorJewels1" className="h-10 w-10" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
