export const OurDesigns = () => {
  const designs = [
    { src: "OurDesigns1.png", alt: "OurDesigns1" },
    { src: "OurDesigns2.png", alt: "OurDesigns2" },
    { src: "OurDesigns3.png", alt: "OurDesigns3" },
    { src: "OurDesigns4.png", alt: "OurDesigns4" },
    { src: "OurDesigns5.png", alt: "OurDesigns5" },
  ];

  return (
    <>
      <div className="container m-auto py-8">
        <h2 className="text-center font-streamline text-5xl">Our Designs</h2>

        <div className="flex justify-center items-start gap-4 pt-8">
          {designs.map((design, index) => (
            <img
              key={index} 
              src={design.src}
              alt={design.alt}
              className="w-1/5 even:mt-10"
            />
          ))}
        </div>
      </div>
    </>
  );
};