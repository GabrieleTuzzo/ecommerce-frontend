export default function Carousel({ products }) {
  console.log(products);
  return (
    <div className="carousel carousel-center bg-base-100 rounded-box h-80 gap-4">
      {products?.map((p, i) => (
        <div key={i} className="carousel-item">
          <img
            src={p.image_url ?? "https://placehold.co/800x800"}
            alt={p.name}
            className="rounded-box shadow-sm"
          />
        </div>
      ))}
    </div>
  );
}
