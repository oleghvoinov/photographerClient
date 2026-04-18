import React, { useState, useEffect } from "react";
import "./adminPortfolio.scss";
import { Collapse } from "antd";
import AddButton from "../../components/UI/addButton/AddButton";
import FormForSlide from "../../components/UI/formForSlide/FormForSlide";
import MyAddDirForm from "../../components/UI/addDirForm/MyAddDirForm";
import { useDispatch, useSelector } from "react-redux";
import { getDir } from "../../API/dir";

const AdminPortfolio = () => {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDir());
    console.log("Список обновился");
    console.log(items);
  }, [items.length]);

  const dirs = useSelector((state) => {
    return state.dirs.dirs;
  });

  useEffect(() => {
    if (dirs.length !== 0) {
      const dirsItem = dirs.map((el, index) => ({
        key: el._id,
        label: el?.name,
        children: <FormForSlide el={el} onDelete={handleDelete} />,
      }));
      setItems(dirsItem);
      console.log("Отработало присваивание");
      console.log(dirsItem);
    } else {
      setItems([]);
    }
  }, [dirs]);

  const onChange = (key) => {
    console.log(key);
  };

  const handleDelete = (idToDelete) => {
    const updatedDirs = dirs.filter((el) => el._id !== idToDelete);
    const updatedItems = updatedDirs.map((el, index) => ({
      key: el._id,
      label: el.name,
      children: <FormForSlide el={el} onDelete={handleDelete} />,
    }));

    setItems(updatedItems);

    // Если `dirs` приходит из стора и тоже должен изменяться, нужно диспатчить экшен
  };

  const addForm = () => {
    const dirsItem = dirs.map((el, index) => ({
      key: el._id,
      label: el?.name,
      children: <FormForSlide el={el} onDelete={handleDelete} />,
    }));
    setItems(dirsItem);
  };

  return (
    <>
      <Collapse items={items} onChange={onChange} />
      <MyAddDirForm addForm={addForm} />
    </>
  );
};

export default AdminPortfolio;
