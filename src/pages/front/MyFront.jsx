import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

import "./myFront.scss";

// const MyFronInner = lazy(
//   () => import("../../components/UI/myFronInner/MyFronInner"),
// );

import MyFronInner from "../../components/UI/myFronInner/MyFronInner";

const MyFront = () => {
  return (
    <div>
      <Helmet>
        <title>
          Фотограф в Нижнем Новгороде — портфолио, цены, услуги | Вика Новикова
        </title>
        <link rel="canonical" href="https://vinovikova.art" />
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
        <meta
          property="og:image"
          content="https://vinovikova.art/files/8bc38993b1acaceb424cc2542af7a560.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinovikova.art" />
      </Helmet>
      {/* <Suspense></Suspense> */}
      <MyFronInner />
    </div>
  );
};

export default MyFront;
