import "./sidebarAdmin.scss";
import { Menu, ConfigProvider } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const SidebarAdmin = () => {
  const items = [
    {
      key: "link",
      icon: <LaptopOutlined />,
      // disabled: true,
      label: <Link to="/">NOVIKOVA</Link>,
    },
    {
      key: "1",

      label: <Link to="/admin">Главная</Link>,
    },
    {
      key: "2",

      label: <Link to="/admin/portfolio">Мои работы</Link>,
    },
    {
      key: "3",

      label: <Link to="/admin/prices">Услуги</Link>,
    },
    {
      key: "4",

      label: <Link to="/admin/about">Контакты</Link>,
    },
    {
      key: "5",

      label: <Link to="/admin/yandexTool">Настройки</Link>,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            darkItemSelectedBg: "#424242",
            darkItemDisabledColor: "#fff",
          },
        },
      }}
    >
      <Menu
        style={{
          width: 200,
          position: "fixed",
          height: "100vh",
          backgroundColor: "#212121",
        }}
        defaultSelectedKeys={["1"]}
        mode="dark"
        theme="vertical"
        items={items}
      />
    </ConfigProvider>
  );
};

export default SidebarAdmin;
