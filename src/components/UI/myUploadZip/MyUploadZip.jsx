import "./myUploadZip.scss";
import { message, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const MyUploadZip = ({ fileList, onChange, onRemove }) => {
  const uploadButton = (
    <Button icon={<UploadOutlined />}>Нажмте чтобы загрузить .zip архив</Button>
  );

  const beforeUpload = (file) => {
    console.log(2222);
    if (file.name.endsWith(".zip")) {
      return true;
    } else {
      message.error(`Выберите .zip файл.`);
      return false;
    }
  };

  return (
    <Upload
      beforeUpload={beforeUpload}
      fileList={fileList}
      onChange={onChange}
      onRemove={onRemove}
      multiple={false}
      maxCount={1}
    >
      {fileList.length >= 1 ? null : uploadButton}
    </Upload>
  );
};

export default MyUploadZip;
