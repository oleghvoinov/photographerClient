import streamSaver from "streamsaver";
import { message } from "antd";

const API = process.env.REACT_APP_API_URL;

export async function downloadFileProxy(diskPath, fileName) {
  try {
    message.success(`Загрузка файла ${fileName} начинается`);
    console.log("Запрашиваем файл:", diskPath, fileName);
    const response = await fetch(
      `${API}/proxy-download?path=${encodeURIComponent(
        diskPath,
      )}&name=${encodeURIComponent(fileName)}`,
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
