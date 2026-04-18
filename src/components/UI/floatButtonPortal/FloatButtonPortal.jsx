// FloatButtonPortal.jsx
import { React, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { FloatButton, ConfigProvider, Modal, Button } from "antd";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { CommentOutlined, EnterOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useScrollbarAwareWidth } from "../../../hook/useScrollbarAwareWidth";
import ModalForRepost from "../modalForRepost/ModalForRepost";

export default function FloatButtonPortal() {
  const location = useLocation();
  const path = location.pathname;

  const [isModalAbout, setIsModalAbout] = useState(false);
  const [isModalPrices, setIsModalPrices] = useState(false);

  const wrapperRef = useRef(null);

  const containerWidthWidget = useScrollbarAwareWidth(wrapperRef);

  let content = null;

  switch (true) {
    case path === "/about":
      content = (
        <div className="wrapper-widget__contacts">
          <p style={{ width: "140px", right: "66px", bottom: "94px" }}>
            Поделиться ссылкой
          </p>
          <FloatButton.Group
            icon={<CommentOutlined size={48} />}
            shape="square"
            style={{ bottom: "86px" }}
          >
            <FloatButton
              onClick={() => setIsModalAbout(true)}
              shape="square"
              icon={
                <EnterOutlined
                  size={48}
                  style={{ transform: "rotate(180deg)" }}
                />
              }
            />
          </FloatButton.Group>
          <Modal
            open={isModalAbout}
            onCancel={() => {
              setIsModalAbout(false);
            }}
            footer={[
              <Button
                key="Cancel"
                onClick={() => {
                  setIsModalAbout(false);
                }}
              >
                Отмена
              </Button>,
            ]}
          >
            <ModalForRepost />
          </Modal>
        </div>
      );
      break;

    case path.startsWith("/case/"):
      content = (
        <>
          <div className="wrapper-widget__contacts">
            <p style={{ bottom: "95px" }}>Напиши мне</p>
            <FloatButton.Group
              trigger="click"
              icon={<CommentOutlined />}
              shape="square"
              style={{ bottom: "86px" }}
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
          <FloatButton.Group
            icon={<CommentOutlined />}
            shape="square"
            style={{ bottom: "86px" }}
          >
            <FloatButton.BackTop shape="square" />
          </FloatButton.Group>
        </>
      );
      break;

    case path === "/prices":
      content = (
        <>
          <div className="wrapper-widget__contacts">
            <p style={{ bottom: "95px" }}>Напиши мне</p>
            <FloatButton.Group
              trigger="click"
              icon={<CommentOutlined />}
              shape="square"
              style={{ bottom: "86px" }}
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
            <p style={{ width: "140px", right: "66px", bottom: "94px" }}>
              Поделиться ссылкой
            </p>
            <FloatButton.Group
              icon={<CommentOutlined size={48} />}
              shape="square"
              style={{ bottom: "86px" }}
            >
              <FloatButton
                onClick={() => setIsModalPrices(true)}
                shape="square"
                icon={
                  <EnterOutlined
                    size={48}
                    style={{ transform: "rotate(180deg)" }}
                  />
                }
              />
            </FloatButton.Group>

            <Modal
              open={isModalPrices}
              onCancel={() => {
                setIsModalPrices(false);
              }}
              footer={[
                <Button
                  key="Cancel"
                  onClick={() => {
                    setIsModalPrices(false);
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
      break;

    default:
      return null; // На других страницах FloatButton не показываем
  }

  return ReactDOM.createPortal(
    <div
      ref={wrapperRef}
      style={{ width: containerWidthWidget || "100%" }}
      className="wrapper-widget-all"
    >
      <ConfigProvider
        theme={{
          components: {
            FloatButton: {
              floatButtonSize: "80px",
            },
          },
        }}
      >
        {content}
      </ConfigProvider>
    </div>,
    document.body
  );
}
