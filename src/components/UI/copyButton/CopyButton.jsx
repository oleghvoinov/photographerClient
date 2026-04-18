import { useState } from "react";
import { Button } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка копирования: ", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      icon={copied ? <CheckOutlined /> : <CopyOutlined />}
    >
      {copied ? "Скопировано" : "Копировать"}
    </Button>
  );
};

export default CopyButton;
