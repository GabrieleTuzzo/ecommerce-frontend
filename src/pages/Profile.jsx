import { useEffect, useState } from "react";
import { fetchUserData, userOrders } from "../store/user/userActions";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "../util/capitalizeFirstLetter";
import Order from "../components/Order";
import Table from "../components/Table";

export default function Profile() {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const responseData = await dispatch(fetchUserData());
      const responseOrders = await dispatch(userOrders());
      setUserData(responseData);
      setOrders(responseOrders);
    }

    fetchData();

    return () => {
      setUserData({});
      setOrders([]);
    };
  }, []);

  const cleanedData = cleanData(userData);

  return (
    <>
      <section>
        <h1 className="text-xl font-bold mb-5">
          Welcome,{" "}
          {capitalizeFirstLetter(
            `${userData?.first_name} ${userData?.last_name}`
          )}
        </h1>
        <div className="bg-base-200 rounded-box p-4">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold">Your Information</h2>
            <button className="btn btn-square btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {cleanedData &&
              Object.entries(cleanedData)?.map(([key, value], i) => (
                <div className="flex justify-between bg-base-100 p-2 rounded-box items-center">
                  <p className="me-5" key={i}>
                    {capitalizeFirstLetter(key)}:
                  </p>
                  <input
                    disabled
                    className="input"
                    type="text"
                    defaultValue={value?.toString()}
                  />
                </div>
              ))}
          </div>
        </div>
      </section>
      <section>
        <div className="bg-base-200 rounded-box p-4">
          <h1 className="text-lg font-bold mb-5">Your Orders</h1>
          <div className="flex gap-2 flex-col overflow-x-auto h-80">
            {orders && <Table itemsArray={orders} actions={false} />}
          </div>
        </div>
      </section>
    </>
  );
}

function cleanData(data) {
  if (!data) return;

  const {
    first_name,
    last_name,
    phone,
    address,
    city,
    postal_code,
    state,
    country,
    email,
  } = data;
  return {
    "First Name": first_name,
    "Last Name": last_name,
    "Phone Number": phone,
    "E-mail Address": email,
    state,
    country,
    city,
    address,
    "Postal Code": postal_code,
  };
}
