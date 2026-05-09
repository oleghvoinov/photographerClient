import "./myPrices.scss";

import mechImg from "../../files/8bc38993b1acaceb424cc2542af7a560.webp";
import mechImgJpg from "../../files/8bc38993b1acaceb424cc2542af7a560.jpg";
import { useScrollbarAwareWidth } from "../../hook/useScrollbarAwareWidth";
import { useRef } from "react";

import { Collapse } from "antd";
import { Helmet } from "react-helmet-async";

const items = [
  {
    key: "1",
    label: "Про что моя фотография?",
    children: (
      <ul className="prices-contianer__text">
        <il>- Про Ваши портреты</il>
        <li>- Про Ваше время в ожидании малыша</li>
        <li>- Про Вашу любовь к себе, людям, домашним животным</li>
      </ul>
    ),
  },
  {
    key: "2",
    label: "Мои условия",
    children: (
      <div className="prices-contianer__text">
        <p>Cоглашаясь на съемку со мной, Вы соглашаетесь с моим видением.</p>
        <p>Я всегда за естественность в жизни и на снимках, поэтому:</p>
        <ul>
          <il>- не меняю пропорции тела</il>
          <li>- делаю естественную ретушь</li>
          <li>
            - до проведения съемки предлагаю созвониться и обсудить детали
          </li>
          <li>
            - в каждой съемке нахожу высокую ценность, поэтому все кадры отбираю
            и обрабатываю сама
          </li>
        </ul>
      </div>
    ),
  },
  {
    key: "3",
    label: "Стоимость",
    children: (
      <div className="prices-contianer__text">
        <p>5000 р</p>
        <ul>
          <il>- 1 час съемки </il>
          <li>- 70+ кадров в цветокоррекции </li>
          <li>- 10-15 кадров в естественной ретуши</li>
          <li>- Помощь с локациями и образами</li>
          <li>
            - Готовые фото в течение 15 дней (анонс — 10 фото в течение 2-х
            дней)
          </li>
        </ul>
        <p>*Cтудия оплачивается отдельно</p>
        <p>
          *Вы получаете максимальное количество кадров в обработке, поэтому
          исходные кадры не отдаю{" "}
        </p>
      </div>
    ),
  },
];

const MyPrices = () => {
  const wrapperRef = useRef(null);
  const containerWidthWidget = useScrollbarAwareWidth(wrapperRef);
  return (
    <div className="footer-wrapper-prices">
      <Helmet>
        <title>
          Цены на фотосъёмку в Нижнем Новгороде — свадьбы, Love Story,
          индивидуальные | Вика Новикова
        </title>
        <link rel="canonical" href="https://vinovikova.art/prices" />
        <meta
          name="description"
          content="Прозрачные цены на фотосъёмку: свадьбы, портреты, love story, мероприятия. Гибкие пакеты и индивидуальный подход."
        />
        <meta property="og:title" content="Цены — Профессиональный фотограф" />
        <meta
          property="og:description"
          content="Цены на свадьбы, портреты, love story и мероприятия. Гибкие пакеты и индивидуальный подход."
        />
        <meta
          property="og:image"
          content="https://vinovikova.art/files/8bc38993b1acaceb424cc2542af7a560.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinovikova.art/prices" />
      </Helmet>
      <div className="prices-wrapper">
        <h1 className="prices__title">Cтоимость и виды работ.</h1>
        <div className="prices-contianer">
          <div className="prices-comtianer__column">
            <img
              className="prices-comtianer__column-img"
              src={mechImg}
              alt="MyPhoto"
            />
          </div>

          <div className="prices-contianer__column">
            <h2 className="prices-contianer__title text-base font-medium pt-2 pb-1">
              Свадебная фотосессия в Нижнем Новгороде
            </h2>
            <p className="prices-contianer__text">
              Запечатлею ваш самый важный день в атмосфере радости и любви.
              Свадебная фотосессия — это живые эмоции, красивые кадры и внимание
              к каждой детали. Естественная съёмка, которая сохранит
              воспоминания на долгие годы.
            </p>
            <h2 className="prices-contianer__title text-base font-medium pt-2 pb-1">
              Love Story фотосессия в Нижнем Новгороде
            </h2>
            <p className="prices-contianer__text">
              Романтическая фотосессия Love Story — это возможность рассказать
              вашу историю любви в фотографиях. Я помогу вам чувствовать себя
              свободно и уверенно, чтобы каждый кадр передавал искренние эмоции
              и особую атмосферу ваших отношений.
            </p>
            <h2 className="prices-contianer__title text-base font-medium pt-2 pb-1">
              Индивидуальная фотосессия в Нижнем Новгороде
            </h2>
            <p className="prices-contianer__text">
              Индивидуальная фотосессия — это время, когда вы в центре внимания.
              Портреты, уличная съёмка или творческие образы — подберём стиль,
              локации и настроение, чтобы кадры отражали именно вас.
              Профессиональная ретушь и внимательное отношение к деталям
              гарантированы.
            </p>
            <Collapse
              className="[&_.ant-collapse-header]:text-base [&_.ant-collapse-header]:font-medium"
              defaultActiveKey={["1"]}
              ghost
              items={items}
            />
          </div>
        </div>
      </div>
      {/* <div
        style={{ width: containerWidthWidget || "100%" }}
        ref={wrapperRef}
        className="wrapper-widget-price"
      >
        <ConfigProvider
          theme={{
            components: {
              FloatButton: {
                floatButtonSize: "80px", // размер кнопок
              },
            },
          }}
        >
          <FloatButton.Group
            trigger="click"
            icon={<CommentOutlined />}
            shape="square"
            style={{ bottom: "36px" }}
          >
            <FloatButton shape="square" icon={<FaTelegramPlane />} />
            <FloatButton shape="square" icon={<FaInstagram />} />
          </FloatButton.Group>
        </ConfigProvider>
      </div> */}
    </div>
  );
};

export default MyPrices;
