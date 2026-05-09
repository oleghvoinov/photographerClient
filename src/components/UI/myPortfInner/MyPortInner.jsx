import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/mousewheel";

import { gsap } from "gsap";

import MySidebarLink from "../sidebarLink/MySidebarLink";
import React, { useRef, useState, useEffect } from "react";
import "./myPortInner.scss";

import { useDispatch, useSelector } from "react-redux";
import { useScrollbarAwareWidth } from "../../../hook/useScrollbarAwareWidth";

import MySlide from "../slide/MySlide";
import { getDir } from "../../../API/dir";

import {
  CommentOutlined,
  CheckOutlined,
  CloseOutlined,
  EnterOutlined,
} from "@ant-design/icons";
import { FaTelegramPlane, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FloatButton, Switch, Modal, Button } from "antd";
import MySubCart from "../subCart/MySubCart";
import ModalForRepost from "../modalForRepost/ModalForRepost";

const MyPortInner = () => {
  const dispatch = useDispatch();

  const [isModalPort, setIsModalPort] = useState(false);

  const [viewMode, setViewMode] = useState(false);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRefs = useRef([]);

  useEffect(() => {
    dispatch(getDir());
  }, [dispatch]);

  const dirsState = useSelector((state) => state.dirs.dirs);

  const dirs = Array.isArray(dirsState)
    ? dirsState.filter((item) => item.inPortfolio)
    : [];

  const handleSlideChange = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    // Анимация при смене активного слайда
    animateSlide(activeIndex);
  }, [activeIndex]);

  const animateSlide = (index) => {
    const slideElement = gsap.utils.selector(slideRefs.current[index]); // Получаем DOM-элемент активного слайда

    if (slideElement) {
      gsap.from(slideElement(".portfolio-content__item-content"), {
        delay: 0.85,
        stagger: 0.1,
        opacity: 0,
        scale: 1.2,
      });
      gsap.from(slideElement(".portfolio-content__item-title"), {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  };

  const onChange = (checked) => {
    setViewMode(checked);
  };

  const sliderRef = useRef(null);
  const gridRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (viewMode) {
      gsap.to(wrapperRef.current, {
        onComplete: () => {
          wrapperRef.current.style.position = "fixed";
        },
      });
      gsap.to(gridRef.current, {
        autoAlpha: 0,
        onComplete: () => {
          gridRef.current.style.display = "none";
        },
      });
      gsap.to(sliderRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        delay: 0.5,
      });
    } else {
      gsap.to(wrapperRef.current, {
        onComplete: () => {
          wrapperRef.current.style.position = "sticky";
        },
      });
      gsap.to(sliderRef.current, { autoAlpha: 0, duration: 0.5 });
      gsap.to(gridRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        delay: 0.5,
        onComplete: () => {
          gridRef.current.style.display = "block";
        },
      });
    }
  }, [viewMode]);

  const containerWidthWidget = useScrollbarAwareWidth(wrapperRef);
  const containerWidthScroller = useScrollbarAwareWidth(sliderRef);

  return (
    <>
      <div className="wrapper">
        <div
          ref={sliderRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: containerWidthScroller || "100%",
            minHeight: "100%",
            overflow: "hidden",
          }}
        >
          <div className="wrapper-grid">
            <div className="wrapper-grid__item">
              <Swiper
                direction="vertical"
                mousewheel={true}
                keyboard={{ enabled: true, onlyInViewport: true }}
                modules={[Mousewheel, Keyboard]}
                style={{ width: "100%", height: "100%" }}
                spaceBetween={20}
                slidesPerView={1}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                lazy={{
                  loadPrevNext: true, // аналог lazyPreloadPrevNext
                }}
              >
                {dirs.map((post, index) => (
                  <SwiperSlide key={index}>
                    <MySlide
                      ref={(el) => (slideRefs.current[index] = el)}
                      key={index}
                      photo={post.prewieImg}
                      date={post.date}
                      path={post._id}
                      className="swiper-lazy"
                    >
                      {post.name}
                    </MySlide>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="wrapper-grid__item">
              <div className="sidebar">
                <div className="sidebar__list-wrapper">
                  <ul className="sidebar__list">
                    {dirs.map((post, index) => (
                      <li key={post._id}>
                        <MySidebarLink
                          handler={handleSlideChange}
                          index={index}
                          activeIndex={activeIndex}
                        >
                          {post.name}
                        </MySidebarLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={gridRef}
          style={{
            width: "100%",
            display: "none",
            opacity: 0,
          }}
        >
          <div className="portfolio-grid">
            {dirs.map((post, index) => (
              <MySubCart post={post} key={post._id} />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={wrapperRef}
        style={{ width: containerWidthWidget || "100%" }}
        className="wrapper-widget"
      >
        <div className="wrapper-widget__contacts">
          <p>Напиши мне</p>
          <FloatButton.Group
            trigger="click"
            icon={<CommentOutlined />}
            shape="square"
            style={{ bottom: "36px" }}
          >
            <a
              style={{ borderRadius: "8px" }}
              href="https://t.me/vi_bratygina"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FloatButton
                style={{
                  borderStartStartRadius: "8px",
                  borderStartEndRadius: "8px",
                }}
                shape="square"
                icon={<FaTelegramPlane />}
              />
            </a>

            <a
              style={{ borderRadius: "8px" }}
              href="https://wa.me/79063649891"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FloatButton
                style={{
                  borderEndStartRadius: "8px",
                  borderEndEndRadius: "8px",
                }}
                shape="square"
                icon={<FaWhatsapp />}
              />
            </a>
          </FloatButton.Group>
        </div>
        <div className="wrapper-widget__contacts">
          <p style={{ width: "140px", right: "66px" }}>Поделиться ссылкой</p>
          <FloatButton.Group
            icon={<CommentOutlined size={48} />}
            shape="square"
            style={{ bottom: "36px" }}
          >
            <FloatButton
              onClick={() => setIsModalPort(true)}
              shape="square"
              icon={
                <EnterOutlined
                  size={48}
                  style={{ transform: "rotate(180deg)" }}
                />
              }
            />
          </FloatButton.Group>
        </div>

        <FloatButton.Group
          type="primary"
          style={{ bottom: "36px" }}
          icon={<CommentOutlined />}
        >
          <div className="wrapper-widget_switch">
            Режим слайда
            <Switch
              onChange={onChange}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              style={{ marginLeft: "5px" }}
            />
          </div>
        </FloatButton.Group>

        <Modal
          open={isModalPort}
          onCancel={() => {
            setIsModalPort(false);
          }}
          footer={[
            <Button
              key="Cancel"
              onClick={() => {
                setIsModalPort(false);
              }}
            >
              Отмена
            </Button>,
          ]}
        >
          <ModalForRepost />
        </Modal>
      </div>
    </>
  );
};

export default MyPortInner;
