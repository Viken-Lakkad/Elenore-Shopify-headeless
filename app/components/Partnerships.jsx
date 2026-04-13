export const Partnerships = ({ partnerships }) => {
  const title = partnerships?.title?.value;
  const images = partnerships?.images?.references?.nodes ?? [];

  return (
    <>
      <div className="py-4">
        <h2 className="font-streamline text-3xl md:text-5xl text-center">
          {title}
        </h2>
        <div className="py-3 sm:py-5 grid grid-cols-3 lg:container m-auto px-1.5">
          {images.map((node, i) => (
            <img
              key={i}
              src={node?.image?.url}
              alt={node?.image?.altText ?? `Partnership ${i + 1}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>
      </div>
    </>
  );
};
