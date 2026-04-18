import "./adminFront.scss";
import React, { useState, useEffect } from "react";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { deleteMainFile, getMainFile, uploadMainFile } from "../../API/file";

const ImageUploader = React.memo(
  ({ index, imagesUrl, handleChange, customUpload, loading, onRemove }) => {
    return (
      <div className="front-item">
        <h3 className="front-item__title">
          {index === 0 ? "Мои работы" : index === 1 ? "Услуги" : "Обо мне"}
        </h3>

        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          beforeUpload={beforeUpload}
          onChange={(info) => handleChange(info, index)}
          customRequest={(options) =>
            customUpload({ ...options, "data-index": index })
          }
          fileList={
            imagesUrl[index]
              ? [
                  {
                    uid: index.toString(),
                    name: `image-${index}`,
                    status: "done",
                    url: imagesUrl[index], // Указываем URL изображения
                  },
                ]
              : []
          }
          onRemove={(file) => onRemove(file)}
        >
          {imagesUrl[index] ? null : (
            <div className="upload-placeholder">
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          )}
        </Upload>
      </div>
    );
  }
);

const getBase64 = (img, callback) => {
  const reader = new FileReader();

  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const AdminFront = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);

  useEffect(() => {
    dispatch(getMainFile());
  }, []);

  const filesMainPage = useSelector((state) => {
    return state.mainFiles.filesMainPage;
  });

  // useEffect(() => {
  //   // Когда файлы загружены, обновляем imagesUrl
  //   if (filesMainPage.length > 0) {
  //     setImagesUrl((prevImagesUrl) => {
  //       // Если данные изменились, обновляем состояние
  //       if (
  //         prevImagesUrl.join() !== filesMainPage.map((el) => el.path).join()
  //       ) {
  //         return filesMainPage.map((el) => el.path);
  //       }
  //       return prevImagesUrl; // Если данные не изменились, не обновляем состояние
  //     });
  //   }
  //   setLoading(false);
  // }, [filesMainPage]); // Будет вызываться только при изменении filesMainPage

  useEffect(() => {
    // Когда файлы загружены, обновляем imagesUrl
    const newList = filesMainPage.map((el) => el?.path);

    setImagesUrl(newList);

    setLoading(false);
  }, [filesMainPage]); // Будет вызываться только при изменении filesMainPage

  console.log(imagesUrl);

  const handleChange = (info, index) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        let newFileList = imagesUrl;
        newFileList[index] = url;

        setImagesUrl(newFileList);
      });
    }
  };

  // const uploadFile = (e, info) => {
  //   const file = info.file;
  //   const index = e.target.index;
  //   dispatch(uploadMainFile(file, index));
  //   const newFileList = fileList;
  //   newFileList[index] = file;
  //   setFileList(fileList);
  // };

  const customUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    const index = options["data-index"];

    try {
      dispatch(uploadMainFile(file, index)); // Передаём индекс в parent-id
      onSuccess("Ok");
      message.success(`File uploaded successfully for index ${index}`);
    } catch (err) {
      onError(err);
      message.error(`File upload failed for index ${index}`);
    }
  };

  const onRemove = (file) => {
    const newImagesUrl = [...imagesUrl];
    newImagesUrl[file.uid] = null;

    setImagesUrl(newImagesUrl);

    dispatch(deleteMainFile(file));
  };

  return (
    <div className="frontWrapper">
      <ImageUploader
        index={0}
        imagesUrl={imagesUrl}
        handleChange={handleChange}
        customUpload={customUpload}
        loading={loading}
        onRemove={onRemove}
      />
      <ImageUploader
        index={1}
        imagesUrl={imagesUrl}
        handleChange={handleChange}
        customUpload={customUpload}
        loading={loading}
        onRemove={onRemove}
      />
      <ImageUploader
        index={2}
        imagesUrl={imagesUrl}
        handleChange={handleChange}
        customUpload={customUpload}
        loading={loading}
        onRemove={onRemove}
      />
    </div>
  );
};

export default AdminFront;
