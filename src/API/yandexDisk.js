import axios from "axios";
import streamSaver from "streamsaver";
import { message } from "antd";

const YANDEX_DISK_API = "https://cloud-api.yandex.net/v1/disk";
const TOKEN = "y0_AgAAAAA3u2vTAAzrBQAAAAEbieltAACq6CWWtPhIUbvovNT85gZiSuuzRg"; // Заменить на полученный токен

const api = axios.create({
  baseURL: YANDEX_DISK_API,
  headers: { Authorization: `OAuth ${TOKEN}` },
});

const API = process.env.REACT_APP_API_URL;

export async function downloadHDfile(diskPath, fileName) {
  try {
    const { data } = await api.get(`/resources/download`, {
      params: { path: diskPath },
    });

    const response = await axios.get(data.href, { responseType: "blob" });

    const blob = new Blob([response.data], { type: response.data.type });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(url), 100); // Чистим URL
  } catch (error) {
    console.error(
      "Ошибка при скачивании:",
      error.response?.data || error.message
    );
  }
}

export async function downloadfileStream(diskPath, fileName) {
  try {
    const { data } = await api.get(`/resources/download`, {
      params: { path: diskPath },
    });

    const response = await fetch(data.href);

    console.log(data.href);

    if (!response.ok || !response.body) {
      throw new Error("Не удалось получить поток из ответа.");
    }

    const fileStream = streamSaver.createWriteStream(fileName, {
      size: +response.headers.get("Content-Length") || undefined,
    });

    if (response.body.pipeTo) {
      await response.body.pipeTo(fileStream);
    } else {
      const writer = fileStream.getWriter();
      const reader = response.body.getReader();
      const pump = () =>
        reader.read().then(({ done, value }) => {
          if (done) {
            writer.close();
            return;
          }
          writer.write(value).then(pump);
        });
      pump();
    }
  } catch (err) {
    console.error("Ошибка при скачивании:", err.response?.data || err.message);
    throw new Error(err.response?.data || "Ошибка загрузки файла");
  }
}

export async function downloadFileProxy(diskPath, fileName) {
  try {
    message.success(`Загрузка файла ${fileName} начинается`);
    console.log("Запрашиваем файл:", diskPath, fileName);
    const response = await fetch(
      `${API}/proxy-download?path=${encodeURIComponent(
        diskPath
      )}&name=${encodeURIComponent(fileName)}`
    );

    if (!response.ok || !response.body) {
      throw new Error("Не удалось получить поток из ответа.");
    }
    console.log("Скачивание файла началось!");

    const fileStream = streamSaver.createWriteStream(fileName, {
      size: +response.headers.get("Content-Length") || undefined,
    });

    if (response.body.pipeTo) {
      await response.body.pipeTo(fileStream);
    } else {
      const writer = fileStream.getWriter();
      const reader = response.body.getReader();
      const pump = () =>
        reader.read().then(({ done, value }) => {
          if (done) {
            writer.close();
            return;
          }
          writer.write(value).then(pump);
        });
      pump();
    }
  } catch (err) {
    console.error("Ошибка при скачивании:", err?.message, err);

    throw new Error("Ошибка загрузки файла");
  }
}
