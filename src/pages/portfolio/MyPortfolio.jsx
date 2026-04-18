import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import mechImgJpg from "../../files/8bc38993b1acaceb424cc2542af7a560.jpg";

const MyPortInner = lazy(() =>
  import("../../components/UI/myPortfInner/MyPortInner")
);

const MyPortfolio = () => {
  return (
    <>
      <Helmet>
        <title>Портфолио фотографа в Нижнем Новгороде | Вика Новикова</title>
        <link rel="canonical" href={window.location.href} />
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
        <meta property="og:image" content={mechImgJpg} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <Suspense>
        <MyPortInner />
      </Suspense>
    </>
  );
};

export default MyPortfolio;
