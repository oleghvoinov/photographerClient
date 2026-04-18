import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import mechImgJpg from "../../files/8bc38993b1acaceb424cc2542af7a560.jpg";

import "./myFront.scss";

const MyFronInner = lazy(() =>
  import("../../components/UI/myFronInner/MyFronInner")
);

const MyFront = () => {
  return (
    <div>
      <Helmet>
        <title>
          Фотограф в Нижнем Новгороде — портфолио, цены, услуги | Вика Новикова
        </title>
        <link rel="canonical" href="https://example.com" />;
        <meta
          name="description"
          content="Профессиональный фотограф. Красивые, живые и эмоциональные фотографии для любых событий — от свадеб до портретных съёмок. Портфолио, цены и контакты онлайн."
        />
        <meta
          property="og:title"
          content="Главная — Профессиональный фотограф"
        />
        <meta
          property="og:description"
          content="Профессиональный фотограф. Красивые, живые и эмоциональные фотографии для любых событий — от свадеб до портретных съёмок."
        />
        <meta property="og:image" content={mechImgJpg} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/" />
      </Helmet>
      <Suspense>
        <MyFronInner />
      </Suspense>
    </div>
  );
};

export default MyFront;
