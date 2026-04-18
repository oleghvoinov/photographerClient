import "./formForSlide.scss";
import React, { useState, useEffect, useRef } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { FaTelegramPlane, FaWhatsapp, FaVk } from "react-icons/fa";
import MyUploadZip from "../myUploadZip/MyUploadZip";
import CopyButton from "../copyButton/CopyButton";

import AddButton from "../addButton/AddButton";

import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import {
  createTab,
  deleteDir,
  deleteTab,
  getDir,
  getOneDir,
  updateDir,
} from "../../../API/dir";
import {
  deleteChildrenFile,
  deletePrewieFile,
  deleteZipFileNoStream,
  updatePrewFile,
  uploadChildrenFile,
  uploadPrewieFile,
  uploadZipFile,
  uploadZipFileYandexStream,
  uploadZipFileYandexStreamMin,
} from "../../../API/file";

import {
  Input,
  DatePicker,
  Checkbox,
  Button,
  Image,
  Upload,
  Tabs,
  message,
} from "antd";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import LoadScreen from "../loadScreen/LoadScreen";

// const DraggableTabNode = ({ className, ...props }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({
//       id: props["data-node-key"],
//     });
//   const style = {
//     ...props.style,
//     transform: CSS.Translate.toString(transform),
//     transition,
//     cursor: "move",
//   };
//   return React.cloneElement(props.children, {
//     ref: setNodeRef,
//     style,
//     ...attributes,
//     ...listeners,
//   });
// };

const FormForSlide = ({ el, onDelete }) => {
  const [isUploadingPrew, setUplPrew] = useState(false);
  const [isUploadingChild, setUplChild] = useState(false);

  const uploadingPrew = useRef(false);
  const pendingQueuePrew = useRef([]);

  const uploadingChild = useRef(false);
  const pendingQueueChild = useRef([]);

  let isDelPrew = false;
  let isDelChild = false;

  const sendler = window.location.origin;
  const shareText = "Ваши фотографии тут :)";

  const [check, setCheck] = useState(el.inPortfolio);
  const [nameDir, setName] = useState(el.name);
  const [dateDir, setDate] = useState(dayjs(el.date));
  const [dir, setDir] = useState({});
  const [tabs, setTabs] = useState([]);

  const [activeKey, setActiveKey] = useState("");

  const [tabName, setTabName] = useState("");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileListChild, setFileListChild] = useState([]);
  const [fileListPrew, setFileListPrew] = useState([]);
  const [fileListZip, setFileListZip] = useState([]);

  const uploadButton = <AddButton>Upload</AddButton>;

  const dispatch = useDispatch();

  console.log(fileListChild);

  useEffect(() => {
    console.log(el.children);
    if (el._id) {
      dispatch(getOneDir(el._id));
    }

    if (el.children.length === 0) {
    } else {
      setActiveKey(el.children[0].index);
      console.log(activeKey);
    }
  }, []);

  const oneDir = useSelector((state) => {
    return state.dirs.oneDir;
  });

  console.log(oneDir);

  useEffect(() => {
    console.log(tabs, "Количество изменилось");
  }, [tabs]);

  useEffect(() => {
    if (oneDir[el._id]?.children.length) {
      let tabs = oneDir[el._id]?.children.map((item) => {
        return {
          label: item.name,
          children: (
            <>
              <Upload
                multiple
                beforeUpload={beforeUpload}
                listType="picture-card"
                fileList={fileListChild}
                onPreview={handlePreview}
                onChange={handleChangeChild}
                onRemove={removeFileChild}
              >
                {isUploadingChild ? <LoadingOutlined /> : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </>
          ),
          key: item.index,
        };
      });

      setTabs(tabs);
    }
  }, [oneDir, fileListChild]);

  useEffect(() => {
    console.log(oneDir[el._id]);
    setDir(oneDir[el._id]);
    console.log(dir);
    console.log(oneDir[el._id]?.prewieImg.length);
    if (oneDir[el._id]?.prewieImg.length) {
      console.log(oneDir[el._id]?.prewieImg);
      let prewImg = oneDir[el._id].prewieImg.map((item) => {
        return {
          uid: item.id,
          name: item.name,
          status: "done",
          url: item.path,
          thumbUrl: item.path,
        };
      });

      setFileListPrew(prewImg);
    }
    console.log(oneDir[el._id]?.children.length);
  }, [oneDir]);

  useEffect(() => {
    console.log(oneDir[el._id]);
    setDir(oneDir[el._id]);

    if (oneDir[el._id]?.zip) {
      console.log(oneDir[el._id]?.zipMIn);
      let zip = [
        {
          uid: oneDir[el._id].zip.name,
          name: oneDir[el._id].zip.name,
          status: "done",
          url: oneDir[el._id].zip.path,
          urlMin: oneDir[el._id]?.zipMIn.path,
        },
      ];

      setFileListZip(zip);
    }
  }, [oneDir]);

  useEffect(() => {
    console.log(oneDir[el._id]);
    setDir(oneDir[el._id]);

    console.log(activeKey);

    const activtab = oneDir[el._id]?.children.find(
      (ch) => ch.index === activeKey
    );

    if (activtab?.tab.length) {
      console.log(activtab.tab);
      let childImg = activtab.tab.map((item) => {
        return {
          uid: item.id,
          name: item.name,
          status: "done",
          url: item.path,
          thumbUrl: item.path,
          uploaded: true,
        };
      });
      setFileListChild(childImg);
    } else {
      setFileListChild([]);
    }
  }, [oneDir, activeKey]);

  //Управление upload
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  //Управление Zip файлами
  const handleChangeZip = async (info) => {
    console.log(info);

    try {
      if (
        info.file.status === "uploading" &&
        !info.event &&
        info.file.percent === 0
      ) {
        console.log(info.file.originFileObj, info.fileList);
        setFileListZip(info.fileList);
        try {
          message.success(
            `Загрузка файла ${info.file.originFileObj.name} начинается`
          );
          await dispatch(
            uploadZipFileYandexStream(info.file.originFileObj, el._id)
          );
          setFileListZip([
            { ...info.fileList[0], status: "uploading", percent: 50 },
          ]);

          console.log("Загрузка оригинальных файлов произошла ");
          message.success(`${info.file.originFileObj.name} упешно загружен`);
        } catch (error) {
          console.log(error?.response?.data?.message);
          message.error(
            `Упс, что то пошло не так! ${
              error?.response?.data?.message || "Ошибка загрузки файла"
            }`
          );
        }

        try {
          await dispatch(
            uploadZipFileYandexStreamMin(info.file.originFileObj, el._id)
          );
          console.log("Загрузка минифицированных файлов прошла успешно!");
          message.success(`Загрузка минифицированных файлов прошла успешно!`);
        } catch (error) {
          console.log(error?.response?.data?.message);
          message.error(
            `Упс, что то пошло не так при загрузке минифицированных файлов! ${
              error?.response?.data?.message || "Ошибка загрузки файла"
            }`
          );
        } finally {
          setFileListZip([{ ...info.fileList[0], status: "done" }]);
        }
      }
    } catch (e) {
      console.log(e?.response?.data?.message);
      message.error(
        `Упс, что то пошло не так! ${
          e?.response?.data?.message || "Ошибка загрузки файла"
        }`
      );
    }

    if (info.file.status === "done") {
      // message.success(`${info.file.name} файл успешно загружен.`);
      setFileListZip(info.fileList);
    } else if (info.file.status === "removed") {
    } else if (info.file.status === "error") {
      // message.error(`Упс, что то пошло не так!`);
    }
  };

  const removeZip = async (file) => {
    try {
      await dispatch(deleteZipFileNoStream(el._id));
      console.log("Удаление произошло");
      setFileListZip([]);
      message.success(`${file.name} файл успешно удален.`);
    } catch (error) {
      message.error(`Упс, что то пошло не так! `);
    }
  };

  //Управление превью файлами
  const handleChangePrew = ({ file, fileList }) => {
    console.log(fileList);

    if (fileList.length === 0) {
      setFileListPrew([]);
    }

    const newList = fileList.filter(
      (f) => !f.status && !f.uploaded && !pendingQueuePrew.current.includes(f)
    );

    const validFiles = newList.filter((f) => {
      if (!isImage(f)) {
        message.error(`Файл "${f.name}" не является изображением.`);
        return false;
      }
      return true;
    });

    const newFileList = validFiles.filter((f) => {
      const isDuplicate = fileListPrew.some((item) => item.name === f.name);
      if (isDuplicate) {
        message.error(`Изображение с именем ${f.name} уже существует.`);
        return false;
      }
      return true;
    });

    console.log(newFileList);
    if (!uploadingPrew.current) {
      pendingQueuePrew.current.push(...newFileList);

      try {
        processQueue();
      } catch (error) {
        console.log(error?.response?.data?.message);
        message.error(
          `Упс, что то пошло не так! ${
            error?.response?.data?.message || "Ошибка загрузки файла"
          }`
        );
      }
    }
  };

  const generateThumb = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const processQueue = async () => {
    uploadingPrew.current = true;
    console.log("processQueue");
    while (pendingQueuePrew.current.length > 0) {
      console.log(pendingQueuePrew.current);
      const file = pendingQueuePrew.current.shift();
      console.log(file);
      await dispatch(uploadPrewieFile(file.originFileObj, el._id));

      const thumb = await generateThumb(file.originFileObj);
      file.status = "done";
      file.thumbUrl = thumb;
      file.uploaded = true;
      // setFileListPrew((prev) => [...prev, file]);
      message.success(`${file.originFileObj.name} упешно загружен`);
    }

    uploadingPrew.current = false;
  };
  const isImage = (file) => {
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".webp",
      ".svg",
    ];
    const fileName = file.name?.toLowerCase() || "";
    return allowedExtensions.some((ext) => fileName.endsWith(ext));
  };

  const removeFilePrew = async (file) => {
    if (file) {
      try {
        console.log(isDelPrew);
        if (isDelPrew) return;
        console.log(file);
        isDelPrew = true;
        await dispatch(deletePrewieFile(file.uid, file.name, el._id));
        console.log(el);
        isDelPrew = false;
      } catch (error) {
        message.error(`Ошибка при удалении файла ${file.name}.`);
      }
    } else {
      message.error(`Файла не существует.`);
    }
  };

  //Управление дочерними файлами
  // const handleChangeChild1 = async (info) => {
  //   console.log(info);

  //   if (isUploadingChild) return;
  //   if (isDelChild) return;

  //   setUplChild(true);

  //   const childCheck = fileListChild;

  //   try {
  //     for (const file of info.fileList) {
  //       if (
  //         file?.status !== "done" &&
  //         file?.status !== "removed" &&
  //         /\.(jpg|jpeg|png|webp)$/i.test(file.originFileObj.name)
  //       ) {
  //         setFileListChild([...childCheck, file]);
  //         await dispatch(
  //           uploadChildrenFile(file.originFileObj, activeKey, el._id)
  //         );
  //         childCheck.push(file);
  //         message.success(`${file.name} упешно загружен`);
  //       } else if (file?.status === "done" && file?.status === "removed") {
  //         setFileListChild(info.fileList);
  //       }
  //     }
  //   } catch (e) {
  //     message.error(
  //       `Упс, что то пошло не так! ${
  //         e?.response?.data?.message || "Ошибка загрузки файла"
  //       }`
  //     );
  //     setFileListChild(childCheck);
  //   } finally {
  //     setUplChild(false);
  //   }

  //   console.log(info.fileList);
  // };

  const handleChangeChild = async ({ file, fileList }) => {
    if (!file.name.endsWith(".zip")) {
      console.log(fileList);

      if (fileList.length === 0) {
        setFileListChild([]);
      }

      const newList = fileList.filter(
        (f) => !f.uploaded && !pendingQueueChild.current.includes(f)
      );

      const validFiles = newList.filter((f) => {
        if (!isImage(f)) {
          message.error(`Файл "${f.name}" не является изображением.`);
          return false;
        }
        return true;
      });
      console.log(validFiles);
      console.log(fileListChild);
      const newFileList = validFiles.filter((f) => {
        const isDuplicate = fileListChild.some((item) => item.name === f.name);
        console.log(isDuplicate);
        if (isDuplicate) {
          message.error(`Изображение с именем ${f.name} уже существует.`);
          return false;
        }
        return true;
      });

      console.log(newFileList);
      if (!uploadingChild.current) {
        pendingQueueChild.current.push(...newFileList);

        try {
          processQueueChild();
        } catch (error) {
          console.log(error?.response?.data?.message);
          message.error(
            `Упс, что то пошло не так! ${
              error?.response?.data?.message || "Ошибка загрузки файла"
            }`
          );
        }
      }
    }
  };

  const processQueueChild = async () => {
    uploadingChild.current = true;
    setUplChild(true);
    console.log("processQueue");
    while (pendingQueueChild.current.length > 0) {
      console.log(pendingQueueChild.current);
      const file = pendingQueueChild.current.shift();
      console.log(file);

      file.uploaded = true;
      // setFileListChild((prev) => [...prev, file]);
      await dispatch(uploadChildrenFile(file.originFileObj, activeKey, el._id));

      // const thumb = await generateThumb(file.originFileObj);
      // file.status = "done";
      // file.thumbUrl = thumb;
      // setFileListChild((prev) => [...prev, file]);
    }
    setUplChild(false);
    uploadingChild.current = false;
  };

  const removeFileChild = async (file) => {
    console.log(isDelChild);
    if (isDelChild) return;
    console.log("delite");
    isDelChild = true;
    setUplChild(true);
    console.log(isUploadingChild);
    dispatch(deleteChildrenFile(file.uid, file.name, el._id, activeKey));
    setUplChild(false);
    console.log(isUploadingChild);
    isDelChild = false;
  };
  const beforeUpload = async (file) => {
    if (!file.name.endsWith(".zip")) return true;

    try {
      setUplChild(true);
      await dispatch(uploadZipFile(file, activeKey, el._id));
      message.success(`Архив ${file.name} загружен.`);
    } catch (e) {
      message.error("Ошибка загрузки архива");
    } finally {
      setUplChild(false);
    }

    return Upload.LIST_IGNORE;
  };

  //Для перетасовки превью файлов
  const sensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setFileListPrew((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        const newFileList = arrayMove(prev, activeIndex, overIndex);

        dispatch(updatePrewFile(el._id, newFileList));

        return newFileList;
      });
      console.log(fileListPrew);
    }
  };
  const DraggableUploadListItem = ({ originNode, file }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: file.uid,
    });
    console.log("Странная функция");
    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
      cursor: "move",
    };
    return (
      <div
        ref={setNodeRef}
        style={style}
        // prevent preview event when drag end
        className={isDragging ? "is-dragging" : ""}
        {...attributes}
        {...listeners}
      >
        {/* hide error tooltip when dragging */}
        {file.status === "error" && isDragging
          ? originNode.props.children
          : originNode}
      </div>
    );
  };

  //Для перетасовки табов
  // const onDragEndTabs = ({ active, over }) => {
  //   if (active.id !== over?.id) {
  //     setTabs((prev) => {
  //       const activeIndex = prev.findIndex((i) => i.key === active.id);
  //       const overIndex = prev.findIndex((i) => i.key === over?.id);
  //       return arrayMove(prev, activeIndex, overIndex);
  //     });
  //   }
  // };
  //Для добавления табов
  const onChange = (key) => {
    setActiveKey(key);
  };
  const add = async () => {
    let newActiveKey = 0;
    if (tabs.length !== 0) {
      console.log(tabs);
      const maxIndexTab = tabs.reduce(
        (max, tab) => (Number(tab.key) > Number(max.key) ? tab : max),
        tabs[0]
      );
      console.log(maxIndexTab.key++);
      newActiveKey = maxIndexTab.key++;
    }

    try {
      console.log(tabName);
      if (tabName.length > 2) {
        setUplChild(true);
        await dispatch(createTab(el._id, newActiveKey, tabName));
        setTabs([
          ...tabs,
          {
            label: tabName,
            children: (
              <>
                <Upload
                  multiple
                  beforeUpload={beforeUpload}
                  listType="picture-card"
                  fileList={fileListChild}
                  onPreview={handlePreview}
                  onChange={handleChangeChild}
                  onRemove={removeFileChild}
                >
                  {isUploadingChild ? <LoadingOutlined /> : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{
                      display: "none",
                    }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </>
            ),
            key: newActiveKey,
          },
        ]);
        console.log(newActiveKey);
        setActiveKey(newActiveKey);
        setTabName("");
      } else {
        message.error(`Название вкладки должно содержать больше 2 символов.`);
      }
    } catch (error) {
      message.error(
        `Упс, что то пошло не так! ${
          error?.response?.data?.message || "Ошибка при создании вкладки"
        }`
      );
    }
    setUplChild(false);
  };
  const remove = async (targetKey) => {
    // const targetIndex = tabs.findIndex((pane) => pane.key === targetKey);
    const newPanes = tabs.filter((pane) => pane.key !== targetKey);
    // if (newPanes.length && targetKey === activeKey) {
    //   const { key } =
    //     newPanes[
    //       targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
    //     ];

    //   setActiveKey(key);
    // }
    try {
      console.log(targetKey);
      console.log(newPanes);

      setTabs(newPanes);
      console.log(tabs);
      message.success("Удаление началось");
      await dispatch(deleteTab(el._id, targetKey));
      message.success("Удалено");
    } catch (err) {
      message.error(
        `Упс, что то пошло не так! ${
          err?.response?.data?.message || "Ошибка загрузки файла"
        }`
      );
    }
  };
  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  //Управление директориями
  const newDateDir = async () => {
    await dispatch(updateDir(el._id, nameDir, check, dateDir));
    dispatch(getDir());
    message.success("Параметры сохранены!");
  };
  const deleteThisDir = () => {
    try {
      dispatch(deleteDir(el._id));
      onDelete(el._id);
    } catch (err) {
      message.err(`Ошибка при удалении кейса ${el.name}.`);
    }
  };
  const getDate = (date, dateString) => {
    setDate(date);
  };

  return (
    <>
      <div className="form-wrapper">
        <Input
          style={{ width: "300px" }}
          placeholder="Введите название проекта"
          value={nameDir}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <DatePicker
          format="YYYY-MM-DD"
          onChange={getDate}
          value={dayjs(dateDir)}
        />
        <Checkbox
          onChange={(e) => {
            setCheck(e.target.checked);
          }}
          checked={check}
        >
          Разместить в портфолио
        </Checkbox>
      </div>
      <div className="resp-wrapper">
        <h3>Поделиться ссылкой</h3>
        <div className="resp">
          <Input
            className="modal__input"
            defaultValue={`${sendler}/case/${el._id}`}
            readOnly
          />
          <CopyButton
            className="modal__button"
            text={`${sendler}/case/${el._id}`}
          />
          <Button href={`${sendler}/case/${el._id}`} target="_blank">
            Перейти
          </Button>
        </div>
        <h3>Поделиться через социальные сети</h3>
        <div className="resp">
          <a
            href={`https://t.me/share/url?url=${sendler}/case/${el._id}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="resp__link"
            style={{
              position: "relative",
              width: "30px",
              height: "30px",
              marginLeft: "10px",
            }}
          >
            <FaTelegramPlane
              style={{ position: "absolute", top: "5px" }}
              size={25}
            />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${sendler}/case/${el._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wrapper-social__link"
            style={{
              position: "relative",
              width: "30px",
              height: "30px",
              marginLeft: "10px",
            }}
          >
            <FaWhatsapp
              style={{ position: "absolute", top: "5px" }}
              size={25}
            />
          </a>
          <a
            href={`https://vk.com/share.php?url=${sendler}/case/${el._id}&text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wrapper-social__link"
            style={{
              position: "relative",
              width: "30px",
              height: "30px",
              marginLeft: "10px",
            }}
          >
            <FaVk style={{ position: "absolute", top: "5px" }} size={25} />
          </a>
        </div>
      </div>
      <div className="preview-wrapper">
        <h3>Превью</h3>
        <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
          <SortableContext
            items={fileListPrew.map((i) => i.uid)}
            strategy={verticalListSortingStrategy}
          >
            <Upload
              multiple
              beforeUpload={() => false}
              listType="picture"
              fileList={fileListPrew}
              onPreview={handlePreview}
              onChange={handleChangePrew}
              onRemove={removeFilePrew}
              itemRender={(originNode, file) => (
                <DraggableUploadListItem originNode={originNode} file={file} />
              )}
            >
              {isUploadingPrew ? <LoadingOutlined /> : uploadButton}
            </Upload>
          </SortableContext>
        </DndContext>

        {previewImage && (
          <Image
            wrapperStyle={{
              display: "none",
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </div>
      <div className="zip-wrapper">
        <h3>Добавьте архив</h3>
        <MyUploadZip
          fileList={fileListZip}
          onChange={handleChangeZip}
          onRemove={removeZip}
        />
      </div>
      <div className="children-wrapper">
        {isUploadingChild ? <LoadScreen /> : null}

        <h3>Работа с контентом на странице</h3>
        <Input
          style={{
            width: "300px",
            marginTop: 20,
            marginBottom: 20,
            marginRight: 20,
          }}
          placeholder="Введите название вкладки"
          value={tabName}
          onChange={(e) => {
            setTabName(e.target.value);
          }}
        />
        <Button style={{ marginTop: 20, marginBottom: 20 }} onClick={add}>
          Добавить вкладку
        </Button>
        {tabs.length === 0 ? null : (
          <Tabs
            hideAdd
            onChange={onChange}
            activeKey={activeKey}
            type="editable-card"
            onEdit={onEdit}
            items={tabs}
          />
        )}
      </div>
      <dvi className="button-wrapper">
        <Button onClick={newDateDir} style={{ marginRight: "10px" }}>
          Сохранить
        </Button>
        <Button onClick={deleteThisDir} danger>
          Удалить
        </Button>
      </dvi>
    </>
  );
};

export default FormForSlide;
