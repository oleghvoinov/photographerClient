import { downloadFileProxy } from "../../../API/yandexDisk";
import "./modalForDown.scss";
import { Button } from "antd";
import path from "path-browserify";

const ModalForDown = (img) => {
  console.log(img);

  const downloadHDFile = async () => {
    await downloadFileProxy(img.img.yandexPath, img.img.name);
  };

  const downloadMinFile = async () => {
    const pathMini = addMiniToFilename(img.img.yandexPath);
    const nameMini = addMiniToFilename(img.img.name);
    await downloadFileProxy(pathMini, nameMini);
  };

  const addMiniToFilename = (filePath) => {
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const name = path.basename(filePath, ext);

    return path.join(dir, `${name}_Mini${ext}`);
  };

  return (
    <>
      <div className="modal">
        <div className="modal__title">Скачать файл </div>
        <Button
          className="modal__buttom"
          type="primary"
          onClick={downloadHDFile}
        >
          Оригинальное качество • {(img.img.size / 1024 / 1024).toFixed(1)} МБ
        </Button>
        <Button className="modal__buttom" onClick={downloadMinFile}>
          Качество для соцсетей • {(img.img.sizeMin / 1024 / 1024).toFixed(1)}{" "}
          МБ
        </Button>
      </div>
    </>
  );
};

export default ModalForDown;
