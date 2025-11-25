import axios from "axios";
import { setError } from "../errorHandlerSlice";
import { decodeToken } from "../../util/decodeToken";
import { login } from "./userSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postLogin = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/login`, {
      ...userData,
    });
    dispatch(login(response.data.access_token));
  } catch (error) {
    dispatch(
      setError({
        name: error.name,
        status: error.status,
        code: error.code,
        message: error.message,
      })
    );
  }
};
