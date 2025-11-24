import { showLoader, hideLoader } from "../store/loaderSlice";
import { setError } from "../store/errorHandlerSlice";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function useUsersView() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  async function fetchUsers() {
    dispatch(showLoader());
    try {
      const response = await axios.get(`${BACKEND_URL}/users`);
      console.log("Fetched users:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      dispatch(
        setError({
          name: error.name,
          status: error.status,
          code: error.code,
          message: error.message,
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  }

  async function deleteUser(id) {
    dispatch(showLoader());
    try {
      const response = await axios.delete(`${BACKEND_URL}/users/${id}`);
      setData(data.filter((value) => value.id !== id));
    } catch (error) {
      dispatch(
        setError({
          name: error.name,
          status: error.status,
          code: error.code,
          message: error.message,
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  }

  return { data, fetchUsers, deleteUser };
}
