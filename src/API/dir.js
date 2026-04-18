import axios from "axios";
import {
  addNewDir,
  removeDir,
  removeOneDir,
  setDir,
  setOneDir,
} from "../redusers/dirFileReducer";

const API = process.env.REACT_APP_API_URL;

export function createDir(dir) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API}/files/createDir`, dir, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response.data);
      dispatch(addNewDir(response.data));
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Ошибка создания папки";
      alert(errorMessage);
    }
  };
}

export function getDir() {
  return async (dispatch) => {
    console.log(`API: ${API}`);
    try {
      const response = await axios.get(`${API}/files/getDir`);
      console.log(response.data);

      dispatch(setDir(response.data));
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Ошибка создания папки";
      alert(errorMessage);
    }
  };
}

export function getOneDir(dirId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API}/files/getOneDir?id=${dirId}`);
      console.log(response.data);
      dispatch(setOneDir({ id: response.data._id, dir: response.data }));
    } catch (e) {
      const errorMessage =
        e.response?.data?.message ||
        "Ошибка при получении кейса портфолио из БД";
      alert(errorMessage);
    }
  };
}

export function updateDir(dirId, name, inPortfolio, date) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API}/files/updateDir?id=${dirId}`,
        { name, inPortfolio, date },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
      dispatch(setOneDir({ id: response.data._id, dir: response.data }));
    } catch (e) {
      const errorMessage =
        e.response?.data?.message ||
        "Ошибка при получении кейса портфолио из БД";
      alert(errorMessage);
    }
  };
}

export function deleteDir(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API}/files/deleteDir?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // dispatch(removeDir(id));
      // dispatch(removeOneDir(id));
      await dispatch(getDir());
    } catch (e) {
      throw new Error(e.response?.data?.message || "Ошибка удаления");
    }
  };
}

export function createTab(dirId, index, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API}/files/createTab?id=${dirId}&index=${index}&name=${name}`,
        {},

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
      dispatch(setOneDir({ id: response.data._id, dir: response.data }));
    } catch (e) {
      throw new Error(
        e.response?.data?.message || "Ошибка при создании вкладки",
      );
    }
  };
}

export function deleteTab(dirId, index) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API}/files/deleteTab?id=${dirId}&index=${index}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      // console.log(response.data);
      // dispatch(setOneDir({ id: response.data._id, dir: response.data }));
      await dispatch(getOneDir(dirId));
    } catch (e) {
      console.log(e.response);
      throw new Error(e.response?.data || "Ошибка загрузки файла");
    }
  };
}
