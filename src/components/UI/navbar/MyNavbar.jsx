import "./myNavbar.scss";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LaptopOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../../../redusers/userReducer";
import { useScrollbarAwareWidth } from "../../../hook/useScrollbarAwareWidth";

import { Modal } from "antd";

gsap.registerPlugin(ScrollTrigger);

const MyNavbar = () => {
  const [open, setOpen] = useState(false);
  const router = useNavigate();
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();
  const q = gsap.utils.selector(menuRef);
  const qBtn = gsap.utils.selector(menuBtnRef);
  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top+=50 top",
        onEnter: () => {
          gsap.to(containerRef.current, {
            backgroundColor: "rgba(238, 238, 238, 0.80)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(containerRef.current, {
            backgroundColor: "transparent",
            boxShadow: "none",
            duration: 0.3,
            overwrite: "auto",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      // Если на главной странице, скрываем меню
      gsap.to(qBtn(".nav-btn"), {
        y: -40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(q(".header-nav__link"), {
        y: -40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
        ease: "power3.in",
      });
    } else {
      // На других страницах показываем меню
      gsap.to(qBtn(".nav-btn"), {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(q(".header-nav__link"), {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [location]);

  const containerWidth = useScrollbarAwareWidth(containerRef);

  const onChange = () => {
    if (open === true) {
      buttonRef.current.classList.remove("opened");
      setOpen(false);
    } else {
      buttonRef.current.classList.add("opened");
      setOpen(true);
    }
  };

  return (
    <header
      ref={containerRef}
      style={{ width: containerWidth || "100%" }}
      className="header-nav"
    >
      <div className="haeder-wrapper">
        <div>
          {isAuth && (
            <Link to="/admin" className="logo-admin">
              <LaptopOutlined />
            </Link>
          )}

          <Link to="/" className="logo">
            <div className="logo__profession">NOVIKOVA</div>
          </Link>
        </div>

        <div className="nav-button fix-block" id="modalClosed" ref={menuBtnRef}>
          <button
            id="modalOpen"
            className="nav-btn"
            ref={buttonRef}
            onClick={onChange}
          >
            <svg width="55px" height="55px" viewBox="0 0 60 60">
              <path
                className="line line1"
                d="M0.057,24.064L51.915,24.173L51.917,7.786L7.818,52.244"
              />

              <path
                className="line line3"
                d="M-0.032,35.821L51.906,35.821L51.907,52.227L7.856,7.812"
              />
            </svg>
          </button>
        </div>

        <nav className="header-nav__links" ref={menuRef}>
          <li>
            <a className="header-nav__link" onClick={() => router("portfolio")}>
              Мои работы
            </a>
          </li>
          <li>
            <a className="header-nav__link" onClick={() => router("prices")}>
              Услуги
            </a>
          </li>
          <li>
            <a className="header-nav__link" onClick={() => router("about")}>
              Контакты
            </a>
          </li>
          {isAuth && (
            <li>
              <button
                style={{ width: "50px", height: "30px" }}
                className="logo-admin"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                <LogoutOutlined />
              </button>
            </li>
          )}
        </nav>
      </div>
      <Modal
        className="header-modal"
        open={open}
        closable={false} // убираем крестик
        footer={null} // убираем кнопки
        title={null} // убираем заголовок
        onCancel={() => setOpen(false)}
        width="100%"
        style={{
          top: 0,
          padding: 0,
          maxWidth: "100%",
          height: "100vh",
          margin: 0,
        }}
        zIndex={50}
      >
        <div className="mobile-menu">
          <Link to="/" onClick={onChange} className="mobile-menu__link">
            Главная
          </Link>
          <Link
            to="/portfolio"
            onClick={onChange}
            className="mobile-menu__link"
          >
            Портфолио
          </Link>
          <Link to="/prices" onClick={onChange} className="mobile-menu__link">
            Цены
          </Link>
          <Link to="/about" onClick={onChange} className="mobile-menu__link">
            Контакты
          </Link>
        </div>
      </Modal>
    </header>
  );
};

export default MyNavbar;
