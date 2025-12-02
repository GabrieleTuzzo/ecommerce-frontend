import { useEffect, useState } from "react";
import { fetchUserData } from "../store/user/userActions";
import { useDispatch } from "react-redux";
import { capitalizeFirstLetter } from "../util/capitalizeFirstLetter";
export default function Profile() {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const responseData = await dispatch(fetchUserData());
      setUserData(responseData);
    }

    fetchData();

    return () => {
      setUserData({});
    };
  }, []);

  const cleanedData = cleanData(userData);
  console.log(userData);

  return (
    <>
      <section>
        <h1 className="text-lg font-bold">
          Welcome,{" "}
          {capitalizeFirstLetter(
            `${userData?.first_name} ${userData?.last_name}`
          )}
        </h1>
        <div>
          {cleanedData &&
            Object.entries(cleanedData)?.map(([key, value], i) => (
              <p className="" key={i}>
                {capitalizeFirstLetter(key)}: {value?.toString()}
              </p>
            ))}
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
