import { useSelector } from "react-redux";

export default function Dashboard() {
  const products = useSelector((state) => state.products);

  return <div>Dashboard Page</div>;
}
