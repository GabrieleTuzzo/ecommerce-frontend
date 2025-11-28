import { showLoader, hideLoader } from "../store/loaderSlice";
import { setError } from "../store/errorHandlerSlice";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { logout } from "../store/user/userSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function useUsersView() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const state = store.getState();

  async function fetchUsers() {
    dispatch(showLoader());
    try {
      const token = state.user.token;
      const response = await axios.get(`${BACKEND_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      if (error.code === 401) dispatch(logout());
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
