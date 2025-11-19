export default function Card({ ...product }) {
  return (
    <div className="card">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={product.image} alt={product.nome} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.nome}</h2>
          <p>{product.descrizione}</p>
          <div className="card-actions justify-end">
            <p>{product.prezzo}</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
