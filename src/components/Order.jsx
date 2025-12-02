export default function Order({ order }) {
  const { items_count, order_number, status, total } = order;

  return (
    <div className="flex justify-between bg-base-100 p-2 rounded-box items-center">
      <p>{order_number}</p>
      <p>{status}</p>
      <p>{items_count}</p>
      <p>{total}</p>
    </div>
  );
}
