import { useDispatch, useSelector } from "react-redux";
import MyFooter from "../../components/MyFooter";
import "./myCase.scss";

import { gsap } from "gsap";

import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getOneDir } from "../../API/dir";
import { downloadFrontFile } from "../../API/file";

import { Image, Tabs, ConfigProvider, Modal, Button, Dropdown } from "antd";

import Masonry from "react-masonry-css";
import { EnterOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  downloadfileStream,
  downloadHDfile,
  downloadFileProxy,
} from "../../API/yandexDisk";
import ModalForDown from "../../components/UI/modalForDown/ModalForDown";
import ModalForRepost from "../../components/UI/modalForRepost/ModalForRepost";
import { useScrollbarAwareWidth } from "../../hook/useScrollbarAwareWidth";

import {
  CommentOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";
import { FloatButton, Switch } from "antd";

import { Helmet } from "react-helmet-async";

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const MyCase = () => {
  const { id } = useParams(); // Получаем параметр id
  console.log("Opened case with ID:", id);
  // const [images, setItems] = useState([]);

  const width = useWindowWidth();
  const columnCount = width < 600 ? 1 : width < 800 ? 2 : 3;

  const wrapperRef = useRef(null);

  const [activeKey, setActiveKey] = useState("");
  const [tabs, setTabs] = useState([]);
  const [isModalOpenForDownload, setIsModalOpenForDownload] = useState(false);
  const [isModalOpenForRepost, setIsModalOpenForRepost] = useState(false);
  const [image, setImage] = useState();

  const itemButton = [
    {
      key: 1,
      label: (
        <Button
          onClick={() => {
            downArchiv(oneDir[id]?.zipMIn.path, oneDir[id]?.zipMIn.name);
          }}
          className="menu-item"
        >
          Формат для соцсетей
        </Button>
      ),
    },
    {
      key: 2,
      label: (
        <Button
          onClick={() => {
            downArchiv(oneDir[id]?.zip.path, oneDir[id]?.zip.name);
          }}
          className="menu-item"
          type="primary"
        >
          Оригинальное качество
        </Button>
      ),
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneDir(id));
  }, []);

  const oneDir = useSelector((state) => {
    return state.dirs.oneDir;
  });

  useEffect(() => {
    if (oneDir[id]?.children.length) {
      let tabs = oneDir[id]?.children.map((item) => {
        return {
          label: item.name,
          children: (
            <>
              <Image.PreviewGroup
                items={item.tab.map((img) => img.path)}
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`,
                    ),
                }}
              >
                <Masonry
                  breakpointCols={columnCount}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {item.tab.map((img, index) => (
                    <div
                      className="image-wrapper"
                      style={{ opacity: 0, transform: "translateY(50px)" }}
                      key={index}
                    >
                      <Image
                        lazy={{}}
                        src={img.path}
                        alt="photo"
                        preview={{
                          mask: (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 10,
                              }}
                            >
                              <DownloadOutlined
                                onClick={(event) => handleDownload(event, img)}
                                style={iconStyle(10)}
                              />
                              {/* <EnterOutlined
                                onClick={() => {
                                  console.log(1);
                                }}
                                style={iconStyle(50)}
                              /> */}
                            </div>
                          ),
                        }}
                      />
                    </div>
                  ))}
                </Masonry>
              </Image.PreviewGroup>
              <div className="masonry-grid"></div>
            </>
          ),
          key: item.index,
        };
      });

      setTabs(tabs);

      if (oneDir[id].children.length == 0) {
        setActiveKey("0");
      } else {
        setActiveKey(String(oneDir[id].children[0].index));
      }
    }
  }, [oneDir]);

  console.log(oneDir);

  useEffect(() => {
    // Ждём, пока вкладка отобразится
    const observer = new IntersectionObserver(
      (entries, obs) => {
        let delay = 0; // Начальная задержка
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: delay, // Задержка появления
            });
            delay += 0.2; // Увеличиваем задержку для следующего элемента
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    // Запуск через requestAnimationFrame для обеспечения того, что DOM элементы уже существуют
    requestAnimationFrame(() => {
      document.querySelectorAll(".image-wrapper").forEach((el) => {
        gsap.set(el, { opacity: 0, y: 20 }); // Сброс анимации
        observer.observe(el); // Наблюдаем за каждым элементом
      });
    });

    // Очистка при размонтировании компонента
    return () => observer.disconnect();
  }, [activeKey]); // Запускаем эффект при смене вкладки

  const handleDownload = async (event, img) => {
    event.stopPropagation(); // Чтобы не открывалось модальное окно
    console.log("открытие модального окна");
    setImage(img);
    setIsModalOpenForDownload(true);

    // downloadFrontFile(img);
    //await downloadHDfile(img.yandexPath, img.name);
  };
  const handleRepost = async (event) => {
    event.stopPropagation(); // Чтобы не открывалось модальное окно
    setIsModalOpenForRepost(true);
    // downloadFrontFile(img);
    //await downloadHDfile(img.yandexPath, img.name);
  };

  const onChange = (key) => {
    console.log("Обновилось ActiveKey ");
    setActiveKey(key);
  };

  const animateTabContent = () => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        let delay = 0; // Начальная задержка
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: delay, // Задержка появления
            });
            delay += 0.2; // Увеличиваем задержку для следующего элемента
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    document
      .querySelectorAll(".image-wrapper")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  };

  const downArchiv = async (diskPath, fileName) => {
    if (!diskPath || !fileName) {
      console.error("Нет пути или имени файла:", diskPath, fileName);
      return;
    }

    try {
      await downloadFileProxy(diskPath, fileName);
    } catch (err) {
      console.error("Ошибка при скачивании архива:", err);
    }
  };

  const containerWidthWidget = useScrollbarAwareWidth(wrapperRef);

  return (
    <div className="footer-wrapper">
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
        <meta property="og:image" content={oneDir[id]?.prewieImg[0].path} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      {tabs.length != 1 ? (
        <div className="case-wrapper">
          <div className="wrapper-button">
            <Button
              style={{
                backgroundColor: "#fff",
                width: "185px",
                zIndex: 200,
              }}
              onClick={(event) => {
                handleRepost(event);
              }}
            >
              Поделиться ссылкой
              <EnterOutlined
                style={{
                  fontSize: "18px",
                  position: "static",
                  transform: "rotate(180deg)",
                  color: "rgba(0, 0, 0, 0.88);",
                }}
              />
            </Button>
            <Dropdown
              className="wrapper-button-item"
              menu={{ items: itemButton }}
              placement="bottomRight"
            >
              <Button style={{ zIndex: 200, width: "185px" }}>
                Скачать альбом{" "}
              </Button>
            </Dropdown>
            <Modal
              open={isModalOpenForRepost}
              onCancel={() => {
                setIsModalOpenForRepost(false);
              }}
              footer={[
                <Button
                  key="Cancel"
                  onClick={() => {
                    setIsModalOpenForRepost(false);
                  }}
                >
                  Отмена
                </Button>,
              ]}
            >
              <ModalForRepost />
            </Modal>
          </div>
          <ConfigProvider
            theme={{
              components: {},
              token: {
                Tabs: {},
              },
            }}
          >
            <Tabs
              activeKey={activeKey}
              items={tabs}
              onChange={onChange}
              onTabClick={() => animateTabContent()}
            />
            <Modal
              open={isModalOpenForDownload}
              onCancel={() => {
                setIsModalOpenForDownload(false);
              }}
              footer={[
                <Button
                  key="Cancel"
                  onClick={() => {
                    setIsModalOpenForDownload(false);
                  }}
                >
                  Отмена
                </Button>,
              ]}
            >
              <ModalForDown img={image} />
            </Modal>
          </ConfigProvider>
        </div>
      ) : (
        <div className="case-wrapper__one">
          <div className="wrapper-button__one">
            <Button
              style={{
                backgroundColor: "#fff",
                width: "185px",
                zIndex: 200,
              }}
              onClick={(event) => {
                handleRepost(event);
              }}
            >
              Поделиться ссылкой
              <EnterOutlined
                style={{
                  fontSize: "18px",
                  position: "static",
                  transform: "rotate(180deg)",
                  color: "rgba(0, 0, 0, 0.88);",
                }}
              />
            </Button>

            <Dropdown
              className="wrapper-button-item"
              menu={{ items: itemButton }}
              placement="bottomRight"
            >
              <Button style={{ zIndex: 200, width: "185px" }}>
                Скачать альбом{" "}
              </Button>
            </Dropdown>
            <Modal
              open={isModalOpenForRepost}
              onCancel={() => {
                setIsModalOpenForRepost(false);
              }}
              footer={[
                <Button
                  color="danger"
                  variant="outlined"
                  key="Cancel"
                  onClick={() => {
                    setIsModalOpenForRepost(false);
                  }}
                >
                  Отмена
                </Button>,
              ]}
            >
              <ModalForRepost />
            </Modal>
          </div>
          <Image.PreviewGroup
            items={oneDir[id].children[0].tab.map((img) => img.path)}
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            <Masonry
              breakpointCols={columnCount}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {oneDir[id].children[0].tab.map((img, index) => (
                <div
                  className="image-wrapper"
                  style={{ opacity: 0, transform: "translateY(50px)" }}
                  key={index}
                >
                  <Image
                    src={img.path}
                    alt="photo"
                    preview={{
                      mask: (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 10,
                          }}
                        >
                          <DownloadOutlined
                            onClick={(event) => handleDownload(event, img)}
                            style={iconStyle(10)}
                          />
                          {/* <EnterOutlined
                            onClick={(event) => {
                              handleRepost(event);
                            }}
                            style={iconStyle(50)}
                          /> */}
                        </div>
                      ),
                    }}
                    lazy={{}}
                    className="fade-in-image"
                  />
                  <Modal
                    open={isModalOpenForDownload}
                    onCancel={() => {
                      setIsModalOpenForDownload(false);
                    }}
                    footer={[
                      <Button
                        key="Cancel"
                        onClick={() => {
                          setIsModalOpenForDownload(false);
                        }}
                      >
                        Отмена
                      </Button>,
                    ]}
                  >
                    <ModalForDown img={image} />
                  </Modal>
                </div>
              ))}
            </Masonry>
          </Image.PreviewGroup>
          <div className="masonry-grid"></div>
        </div>
      )}
      {/* <div
        ref={wrapperRef}
        style={{ width: containerWidthWidget || "100%" }}
        className="wrapper-widget"
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
            icon={<CommentOutlined />}
            shape="square"
            style={{ bottom: "36px" }}
          >
            <FloatButton.BackTop shape="square" />
          </FloatButton.Group>

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

const iconStyle = (right) => ({
  position: "absolute",
  bottom: 10,
  right: `${right}px`,
  fontSize: 24,
  color: "white",

  padding: 8,
  borderRadius: "50%",
  cursor: "pointer",
});

export default MyCase;
