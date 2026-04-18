import "./modalForRepost.scss";
import { Input } from "antd";
import path from "path-browserify";
import CopyButton from "../copyButton/CopyButton";
import { FaTelegramPlane, FaInstagram, FaWhatsapp, FaVk } from "react-icons/fa";
import { Link } from "react-router-dom";

const ModalForRepost = () => {
  const sendler = window.location.href;

  return (
    <>
      <div className="modal">
        <div className="modal__title">Поделиться ссылкой </div>
        <div className="modal__subtitle">
          Для того, чтобы поделиться, скопируйте ссылку
        </div>
        <Input className="modal__input" defaultValue={sendler} readOnly />
        <CopyButton className="modal__button" text={sendler} />
        <div className="modal__subtitle">
          Или поделиться через социальные сети
        </div>
        <div className="wrapper-social">
          <a
            href={`https://t.me/share/url?url=${sendler}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wrapper-social__link"
          >
            <FaTelegramPlane size={32} color="#000" />
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${sendler}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wrapper-social__link"
          >
            <FaWhatsapp size={32} color="#000" />
          </a>
          <a
            href={`https://vk.com/share.php?url=${sendler}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wrapper-social__link"
          >
            <FaVk size={32} color="#000" />
          </a>
        </div>
      </div>
    </>
  );
};

export default ModalForRepost;
