import { StarIcon } from "../Icons/StarIcon";

export const WhyElinorJewels = () => {
  return (
    <>
      <section className="bg-accent">
        <div className="py-8">
          <p className="flex items-center justify-center text-lg gap-4">
            <span>
              <StarIcon />
            </span>
            <span>(6,325 verified reviews)</span>
          </p>
          <h2 className="text-center font-streamline text-2xl xs:text-3xl sm:text-5xl px-1.5 sm:px-0 mt-4">
            Why Elinor Jewels
          </h2>
          <div className="mt-9 grid grid-cols-2 gap-6 md:grid-cols-4 m-auto w-full md:w-7/12">
            <div>
              <div className="icon h-16 w-36 m-auto">
                <img
                  src="WhyElinorJewels1.png"
                  className="m-auto"
                  alt="WhyElinorJewels1"
                />
              </div>
              <p className="text-center mt-2">Long Lasting</p>
            </div>
            <div>
              <div className="icon h-16 w-36 m-auto">
                <img
                  src="WhyElinorJewels2.png"
                  className="m-auto"
                  alt="WhyElinorJewels1"
                />
              </div>
              <p className="text-center mt-2">Waterproof</p>
            </div>
            <div>
              <div className="icon h-16 w-36 m-auto">
                <img
                  src="WhyElinorJewels3.png"
                  className="m-auto"
                  alt="WhyElinorJewels1"
                />
              </div>
              <p className="text-center mt-2">Free Gift Box</p>
            </div>
            <div>
              <div className="icon h-16 w-36 m-auto">
                <img
                  src="WhyElinorJewels4.png"
                  className="m-auto"
                  alt="WhyElinorJewels1"
                />
              </div>
              <p className="text-center mt-2">1500+ Reviews</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
