import "./myAbout.scss";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import mechImgJpg from "../../files/8bc38993b1acaceb424cc2542af7a560.jpg";

const MyAbout = () => {
  return (
    <div className="prices-wrapper">
      <Helmet>
        <title>Фотограф в Нижнем Новгороде. Контакты| Вика Новикова</title>
        <link rel="canonical" href={window.location.href} />
        <meta
          name="description"
          content="Свяжитесь с фотографом для бронирования съёмки или консультации."
        />
        <meta
          property="og:title"
          content="Контакты — Профессиональный фотограф"
        />
        <meta
          property="og:description"
          content="Свяжитесь для бронирования съёмки или консультации. Телефон, email, мессенджеры и форма обратной связи."
        />
        <meta property="og:image" content={mechImgJpg} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <div className="contacts-container">
        <p>Привет!</p>
        <p>Напиши мне в Telegram или в WhatsApp</p>
        <p>И мы договоримся о съемке</p>
      </div>
      <div className="contacts-button">
        <button className="contacts-button__btn">
          <FaTelegramPlane size={24} />
          <p>Напиши мне в Telegram</p>
        </button>
        <button className="contacts-button__btn">
          <FaWhatsapp size={24} />
          <p>Напиши мне в Whatsapp</p>
        </button>
      </div>
    </div>
  );
};

export default MyAbout;
