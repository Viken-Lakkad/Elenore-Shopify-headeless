export const Tagline = ({ customerReviews }) => {
  return (
    <>
      <section className="py-8 bg-primary">
        <div className="max-w-lg px-1.5 m-auto text-center text-white">
          <p>
            “{customerReviews[0]?.reviewText?.value || "Default review text"}”
          </p>
          <p>-{customerReviews[0]?.reviewerName?.value || "Default reviewer name"}</p>
        </div>
      </section>
    </>
  );
};
