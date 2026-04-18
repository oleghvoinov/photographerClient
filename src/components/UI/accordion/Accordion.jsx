import { Collapse } from "antd";
import { ChevronRight } from "lucide-react";

const { Panel } = Collapse;

export default function Accordion() {
  return (
    <Collapse
      accordion
      bordered={false}
      expandIconPosition="right"
      expandIcon={({ isActive }) => (
        <ChevronRight
          className={`transition-transform duration-300 ${
            isActive ? "rotate-90" : ""
          }`}
          size={20}
        />
      )}
      className="
        bg-transparent
        [&_.ant-collapse-header]:px-4
        [&_.ant-collapse-header]:py-3
        [&_.ant-collapse-header]:text-lg
        [&_.ant-collapse-header]:font-medium
        [&_.ant-collapse-header]:hover:bg-gray-100
        [&_.ant-collapse-arrow]:text-gray-500
        [&_.ant-collapse-content]:bg-white
        [&_.ant-collapse-content]:px-4
        [&_.ant-collapse-content]:py-3
        rounded-xl
        shadow-sm
      "
    >
      <Panel header="Что такое shadcn/ui?" key="1">
        Это UI-компоненты, построенные на Radix UI + Tailwind, с простыми
        стилями, которые легко менять.
      </Panel>
      <Panel header="Почему мы используем Ant Design?" key="2">
        Потому что это готовая библиотека с богатыми возможностями и токенами
        для кастомизации.
      </Panel>
      <Panel header="Можно ли совместить их стили?" key="3">
        Да! Мы можем взять Ant Design функционал и стилизовать его под
        минимализм shadcn.
      </Panel>
    </Collapse>
  );
}
