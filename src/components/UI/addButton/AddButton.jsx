import "./addButton.scss";
import { PlusOutlined } from "@ant-design/icons";

const AddButton = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="uploudButton" type="button">
      <PlusOutlined />
      <div
        style={{
          marginTop: 2,
        }}
      >
        {children}
      </div>
    </button>
  );
};

export default AddButton;
