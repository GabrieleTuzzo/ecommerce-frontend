import { useNavigate } from "react-router-dom";

export default function Carousel({ products }) {
  const navigate = useNavigate();
  return (
    <div className="carousel carousel-center bg-base-100 rounded-box h-80 gap-4">
      {products?.map((p, i) => (
        <div
          key={i}
          onClick={() => navigate(`/product/${p.id}`)}
          className="carousel-item hover:cursor-pointer"
        >
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
