import React, { useEffect, useState } from "react";
import { Form, Input, Button, Alert, Spin, message, Card } from "antd";
import { validateToken, saveToken } from "../../API/token"; // поправь путь
import ModalHelpYandex from "../../components/UI/modalHelpYandex/ModalHelpYandex";

const AdminTools = () => {
  const [status, setStatus] = useState("loading");
  // loading | valid | invalid

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [loadingSave, setLoadingSave] = useState(false);
  const [form] = Form.useForm();

  // 🔍 Проверка токена при заходе
  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await validateToken();

        console.log(res);

        if (res?.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch (e) {
        setStatus("invalid");
      }
    };

    checkToken();
  }, []);

  // 💾 Сохранение токена
  const handleSave = async (values) => {
    setLoadingSave(true);

    try {
      const res = await saveToken(values.token);

      if (res) {
        setStatus("valid");
        form.resetFields();
        message.success("Токен сохранён и валиден");
      } else {
        setStatus("invalid");
        message.error("Токен невалидный");
      }
    } catch (e) {
      setStatus("invalid");
      message.error("Ошибка при сохранении токена");
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <>
      <Card
        title="Интеграция с Яндекс.Диском"
        style={{
          maxWidth: 500,
          background: "transparent",
          border: "none",
        }}
      >
        {/* ⏳ Загрузка */}
        {status === "loading" && (
          <div style={{ textAlign: "center", padding: 20 }}>
            <Spin />
          </div>
        )}

        {/* ✅ Валидный токен */}
        {status === "valid" && (
          <>
            <Alert
              message="Токен валиден"
              description="Интеграция работает корректно"
              type="success"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <Button onClick={() => setStatus("invalid")}>Заменить токен</Button>
          </>
        )}

        {/* ❌ Невалидный токен */}
        {status === "invalid" && (
          <>
            <Alert
              message="Токен не валиден"
              description="Введите корректный токен Яндекс.Диска"
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <Form form={form} onFinish={handleSave}>
              <Form.Item
                name="token"
                rules={[
                  { required: true, message: "Введите токен" },
                  { min: 10, message: "Слишком короткий токен" },
                ]}
              >
                <Input.Password placeholder="Введите OAuth токен" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loadingSave}
                block
              >
                Сохранить токен
              </Button>
            </Form>
          </>
        )}
        <Button
          type="link"
          onClick={() => setIsHelpOpen(true)}
          style={{ padding: 0 }}
        >
          Как получить токен?
        </Button>
      </Card>
      <ModalHelpYandex isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
    </>
  );
};

export default AdminTools;
