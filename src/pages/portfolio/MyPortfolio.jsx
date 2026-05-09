import MyPortInner from "../../components/UI/myPortfInner/MyPortInner";
import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

// const MyPortInner = lazy(
//   () => import("../../components/UI/myPortfInner/MyPortInner"),
// );

const MyPortfolio = () => {
  return (
    <>
      <Helmet>
        <title>Портфолио фотографа в Нижнем Новгороде | Вика Новикова</title>
        <link rel="canonical" href="https://vinovikova.art/portfolio" />
        <meta
          name="description"
          content="Портфолио фотографа: лучшие свадебные, портретные и репортажные работы. Живые эмоции, идеальный свет и уникальный стиль съёмки."
        />
        <meta
          property="og:title"
          content="Портфолио — Профессиональный фотограф"
        />
        <meta
          property="og:description"
          content="Лучшие свадебные, портретные и репортажные работы. Живые эмоции, идеальный свет и уникальный стиль съёмки."
        />
        <meta
          property="og:image"
          content="https://vinovikova.art/files/8bc38993b1acaceb424cc2542af7a560.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vinovikova.art/portfolio" />
      </Helmet>
      {/* <Suspense></Suspense> */}
      <MyPortInner />
    </>
  );
};

export default MyPortfolio;
