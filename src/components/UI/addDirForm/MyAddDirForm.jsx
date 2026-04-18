import "./myAddDirForm.scss";
import { Input, DatePicker, Checkbox } from "antd";
import AddButton from "../addButton/AddButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createDir } from "../../../API/dir";
import { message } from "antd";

const MyAddDirForm = ({ addForm }) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [inPortfolio, setInPortfolio] = useState(false);
  const [name, setName] = useState("");

  const getDate = (date, dateString) => {
    setDate(date);
  };
  const getName = (e) => {
    setName(e.target.value);
  };
  const toPublish = (e) => {
    setInPortfolio(e.target.checked);
  };

  const addNewDir = () => {
    if (name.length > 2) {
      dispatch(createDir({ name, inPortfolio, date }));
      addForm();
      setName("");
      setInPortfolio(false);
      setDate(null);
    } else {
      message.error(`Название должно содержать больше 2 символов.`);
    }
  };

  return (
    <div className="addForm">
      <Input
        style={{ width: "300px" }}
        placeholder="Введите название проекта"
        onChange={getName}
        value={name}
      />
      <DatePicker value={date} onChange={getDate} />
      <Checkbox checked={inPortfolio} onChange={toPublish}>
        Разместить в портфолио
      </Checkbox>

      <AddButton onClick={() => addNewDir()}>Добавить</AddButton>
    </div>
  );
};

export default MyAddDirForm;
