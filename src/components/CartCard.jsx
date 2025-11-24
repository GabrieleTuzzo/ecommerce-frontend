export default function CartCard() {
  return (
    <div className="card card-xs bg-base-100">
      <div className="card-body">
        <h2 className="card-title">test card</h2>
        <div className="card-actions items-center">
          <button className="btn btn-sm btn-secondary flex-1">-</button>
          <div className="text-center">Number of items</div>
          <button className="btn btn-sm btn-secondary flex-1">+</button>
        </div>
      </div>
    </div>
  );
}
