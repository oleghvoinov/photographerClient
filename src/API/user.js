import axios from "axios";
import { setUser } from "../redusers/userReducer";

const API = process.env.REACT_APP_API_URL;

export const alogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API}/auth/inlogin`, {
        email,
        password,
      });
      console.log(email);
      dispatch(setUser(response.data.user));
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      console.log(e.response.data);
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API}/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);

      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Ошибка авторизации";
      console.log(errorMessage);
      localStorage.removeItem("token");
    }
  };
};
