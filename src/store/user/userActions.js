import axios from "axios";
import { setError } from "../errorHandlerSlice";
import { login, logout } from "./userSlice";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

export const postLogin = (userData, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/users/login`, {
      ...userData,
    });
    dispatch(login(response.data.access_token));
    navigate("/");
  } catch (error) {
    if (error.status === 401) {
      return "Wrong email or password!";
    }

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

export const postOrder = (userData) => async (dispatch, getState) => {
  const token = getState().user.token;
  try {
    console.log(userData);
    const response = await axios.post(`${BACKEND_URL}/orders/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const order_id = response.data.id;

    const payment_url = await dispatch(payOrder(order_id));

    return payment_url;
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

export const payOrder = (order_id) => async (dispatch, getState) => {
  const token = getState().user.token;
  try {
    const paymentResponse = await axios.post(
      `${BACKEND_URL}/orders/${order_id}/initiate-payment`,
      {
        success_url: `${FRONTEND_URL}/user/payment-success`,
        cancel_url: `${FRONTEND_URL}/user/payment-cancel`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const paymentData = {
      checkout_url: paymentResponse.data.checkout_url,
      session_id: paymentResponse.data.session_id,
    };
    return paymentData;
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

export const confirmOrder =
  (token, session_id, order_id) => async (dispatch, getState) => {
    console.log("Confirming order...");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/orders/${order_id}/confirm-payment`,
        {
          session_id: session_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
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

export const checkToken = (token, callback) => async (dispatch) => {
  console.log("Checking token...");
  try {
    const response = await axios.get(`${BACKEND_URL}/users/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data?.valid) {
      callback();
    } else {
      dispatch(logout());
    }
  } catch (error) {
    if (error.code === 401) dispatch(logout());
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
