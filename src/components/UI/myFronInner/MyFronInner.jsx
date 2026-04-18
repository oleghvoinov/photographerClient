import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

import MyMainCart from "../mainCart/MyMainCart";
import "./myFronInner.scss";

import { useDispatch, useSelector } from "react-redux";
import { getMainFile } from "../../../API/file";
import MyLoader from "../loader/MyLoader";

const MyFronInner = () => {
  const router = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const el = useRef();
  const q = gsap.utils.selector(el);

  const fileList = useSelector((state) => {
    return state.mainFiles.filesMainPage;
  });

  useEffect(() => {
    dispatch(getMainFile());
  }, []);

  console.log(fileList);

  // Ждём загрузки <img> в DOM
  useEffect(() => {
    if (fileList.length === 0) return;
    if (!el.current) return; // защита от undefined

    const imgs = el.current.querySelectorAll("img");
    if (imgs.length === 0) {
      setLoading(false);
      return;
    }

    let loaded = 0;
    imgs.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === imgs.length) setLoading(false);
      } else {
        img.addEventListener("load", () => {
          loaded++;
          if (loaded === imgs.length) setLoading(false);
        });
        img.addEventListener("error", () => {
          loaded++;
          if (loaded === imgs.length) setLoading(false);
        });
      }
    });
  }, [fileList]);

  useEffect(() => {
    if (!loading) {
      gsap.to(q(".main-nav__item"), {
        opacity: 1,
        rotationY: 0,
        scale: 1,
        x: 0,
        stagger: 0.4,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [loading]);

  return (
    <div className="header">
      {loading && <MyLoader />}
      <div
        className="container"
        style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <div className="main-nav" ref={el}>
          <MyMainCart
            onClick={() => router("portfolio")}
            src={fileList[0]?.path}
            alt="портфолио"
          >
            работы
          </MyMainCart>
          <MyMainCart
            onClick={() => router("prices")}
            src={fileList[1]?.path}
            alt="услуги"
          >
            услуги
          </MyMainCart>
          <MyMainCart
            onClick={() => router("about")}
            src={fileList[2]?.path}
            alt="Обо мне"
          >
            Контакты
          </MyMainCart>
        </div>
      </div>
    </div>
  );
};

export default MyFronInner;
