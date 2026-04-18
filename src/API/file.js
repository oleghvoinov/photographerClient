import axios from "axios";
import { addMainFile, deleteFileMain } from "../redusers/mainFileReducer";
import { getOneDir } from "./dir";
import {
  removeChildrenFile,
  removePrewieFile,
  setOneDir,
} from "../redusers/dirFileReducer";

const API = process.env.REACT_APP_API_URL;

export function getMainFile() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${API}/files/getFilesMainPage`
        // {
        //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        // }
      );

      dispatch(addMainFile(response.data));
    } catch (e) {
      alert(e.response);
    }
  };
}

export function uploadMainFile(file, parent) {
  return async (dispatch, getState) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API}/files/uploadFileMainPage?parent=${parent}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const state = getState();
      const fileMainPage = [...state.mainFiles.filesMainPage];

      // Обновляем состояние
      fileMainPage[parent] = response.data;

      // Диспатчим обновлённое состояние
      dispatch(addMainFile(fileMainPage));
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Ошибка загрузки файла";
      alert(errorMessage);
    }
  };
}

export function uploadPrewieFile(file, id) {
  return async (dispatch) => {
    try {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API}/files/uploadPrewieImg?id=${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(getOneDir(id));
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Ошибка загрузки файла";
      throw new Error(errorMessage);
    }
  };
}

export function deleteMainFile(file) {
  return async (dispatch) => {
    console.log(file);
    try {
      const response = await axios.delete(
        `${API}/files/deleteFileMainPage?id=${file.uid}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(deleteFileMain(file.uid));
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Ошибка удаления файла";
      alert(errorMessage);
    }
  };
}

export function deletePrewieFile(id, name, dirId) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API}/files/deletePrewieImg?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(getOneDir(dirId));
      // dispatch(removePrewieFile({ name: name, dirId: dirId }));
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Ошибка удаления файла";
      throw e;
    }
  };
}

export function updatePrewFile(dirId, prewFileArr) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${API}/files/updatePrewieImg?id=${dirId}`,
        { arr: prewFileArr },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      dispatch(setOneDir({ id: response.data._id, dir: response.data }));
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || "Ошибка при обновлении списка превью";
      alert(errorMessage);
    }
  };
}

export function uploadChildrenFile(file, index, id) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${API}/files/uploadChildrenImg?id=${id}&index=${index}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(getOneDir(id));
    } catch (e) {
      throw new Error(e.response?.data?.message || "Ошибка загрузки файла");
    }
  };
}

export function uploadZipFile(file, index, id) {
  return async (dispatch) => {
    try {
      // const formData = new FormData();
      // formData.append("archive", file);
      console.log(1);

      const response = await axios.post(
        `${API}/files/uploadZipFile?id=${id}&index=${index}`,
        file,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/octet-stream",
          },
        }
      );
      dispatch(getOneDir(id));
    } catch (e) {
      throw new Error(e.response?.data?.message || "Ошибка загрузки файла");
    }
  };
}

export function uploadZipFileYandexStream(file, id) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file); //archive

      const response = await axios.post(
        `${API}/uploadZipFileYandexStream?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Запрос завершён:", response); // Лог после запроса

      // await dispatch(getOneDir(id));

      return response;
    } catch (e) {
      console.log(e.response);
      throw new Error(e.response?.data || "Ошибка загрузки файла");
    }
  };
}

export function uploadZipFileYandexStreamMin(file, id) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file); //archive

      const response = await axios.post(
        `${API}/uploadZipFileYandexStreamMin?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Запрос завершён:", response); // Лог после запроса

      await dispatch(getOneDir(id));

      return response;
    } catch (e) {
      console.log(e.response);
      throw new Error(e.response?.data || "Ошибка загрузки файла");
    }
  };
}

export function uploadZipFileYandexNoStream(file, id) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file); //archive

      const response = await axios.post(
        `${API}/files/uploadZipFileYandexNoStream?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(getOneDir(id));
    } catch (e) {
      console.log(e.response);
      throw new Error(e.response?.data || "Ошибка загрузки файла");
    }
  };
}

export function uploadOneZip(file, id) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      console.log("file:", file);
      console.log("file instanceof File:", file instanceof File);
      console.log("file.name:", file?.name);
      formData.append("file", file);

      const response = await axios.post(
        `${API}/files/uploadOneZip?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(getOneDir(id));
    } catch (e) {
      throw new Error(e.response?.data?.message || "Ошибка загрузки файла");
    }
  };
}

export function deleteZipFileNoStream(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API}/files/deleteZipFileNoStream?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(getOneDir(id));
    } catch (e) {
      console.log(e.response?.data);
      throw new Error(e.response?.data || "Ошибка загрузки файла");
    }
  };
}

export function deleteChildrenFile(id, name, dirId, index) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API}/files/deleteChildrenImg?id=${id}&index=${index}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(getOneDir(dirId));
      // dispatch(removeChildrenFile({ name: name, dirId: dirId }));
    } catch (e) {
      const errorMessage = e.response?.data?.message || "Ошибка удаления файла";
      alert(errorMessage);
    }
  };
}

export async function downloadFrontFile(file) {
  try {
    console.log(file);
    const response = await fetch(
      `${API}/files/downloadFront?id=${file.id}`
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // }
    );

    if (response.status === 200) {
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  } catch (e) {
    console.error(e);
    alert(e.message || "Ошибка скачивания файла");
  }
}
