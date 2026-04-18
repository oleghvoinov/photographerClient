import React from "react";
import ReactDOM from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";

import App from "./App";
import { store } from "./redusers/index";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      components: {
        Switch: {
          colorPrimary: "#0b0b0b",
          colorPrimaryHover: "#222222",
          colorBgContainer: "#d9d9d9",
        },
        Tabs: {
          itemColor: "#000",
          itemSelectedColor: "#222222",
          itemActiveColor: "#222222",
          inkBarColor: "#222222",
          itemHoverColor: "#222222",
          horizontalItemGutter: 32,
        },
        Button: {
          colorPrimaryHover: "#484848",
          colorPrimary: "#000",
        },
        Dropdown: { controlItemBgHover: "", borderRadius: 1, paddingBlock: 7 },
        FloatButton: { floatButtonSize: "120px" },
      },
    }}
  >
    <Provider store={store}>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </Provider>
  </ConfigProvider>
);
