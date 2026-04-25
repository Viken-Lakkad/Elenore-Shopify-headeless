export const Tagline = ({ customerReviews }) => {
  const review = customerReviews?.[0];
  const reviewText = review?.reviewText?.value;
  const reviewerName = review?.reviewerName?.value;

  if (!reviewText && !reviewerName) return null;

  return (
    <section className="py-8 bg-primary" aria-label="Customer testimonial">
      <div className="max-w-lg px-1.5 m-auto text-center text-white">
        <blockquote cite={reviewerName ?? undefined} className="not-italic">
          <p className="text-white">
            &ldquo;{reviewText ?? "Default review text"}&rdquo;
          </p>
          <footer className="mt-1">
            <cite className="text-white not-italic">
              &mdash; {reviewerName ?? "Default reviewer name"}
            </cite>
          </footer>
        </blockquote>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            reviewBody: reviewText ?? "",
            author: {
              "@type": "Person",
              name: reviewerName ?? "",
            },
          }),
        }}
      />
    </section>
  );
};
