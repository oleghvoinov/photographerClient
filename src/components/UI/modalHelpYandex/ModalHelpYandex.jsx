import { Modal, Typography, Image } from "antd";

const ModalHelpYandex = ({ isHelpOpen, setIsHelpOpen }) => {
  const { Paragraph, Text, Link } = Typography;
  return (
    <>
      <Modal
        title="Как получить токен Яндекс.Диска"
        open={isHelpOpen}
        onCancel={() => setIsHelpOpen(false)}
        footer={null}
      >
        <Paragraph>
          1. Перейдите по ссылке для создания OAuth-приложения:
        </Paragraph>

        <Paragraph>
          <Link href="https://oauth.yandex.ru/" target="_blank">
            https://oauth.yandex.ru/
          </Link>
        </Paragraph>

        <Paragraph>
          2. Нажмите на кнопку - <Text strong>"Создать приложение"</Text>
        </Paragraph>

        <Paragraph>
          3. В появившемся окне выбираем{" "}
          <Text strong>"Для доступа к API или отладке"</Text>
          <Image width={200} alt="basic" src="/files/API.png" />
        </Paragraph>

        <Paragraph>
          4. В появившемся окне введите любое название проекта, свою почту для
          отслеживания состояния приложения и получения оповещений, а также
          следующие виды разрешений в поле <Text strong>"Доступ к данным"</Text>
          :<Text strong> cloud_api:disk.app_folder</Text>.
        </Paragraph>

        <Paragraph>
          <Image width={200} alt="basic" src="/files/Pole.png" />
        </Paragraph>

        <Paragraph>
          5. Далее, чтобы получить токен введи в адресной строке браузера
          следующий адрес:
        </Paragraph>

        <Paragraph>
          https://oauth.yandex.ru/authorize?response_type=token&client_id=
          <Text strong>идентификатор приложения</Text>
        </Paragraph>

        <Paragraph>
          где вместо <Text strong>"идентификатор приложения"</Text> укажите{" "}
          <Text strong>ClientID</Text> вашего приложения.
        </Paragraph>

        <Paragraph>Возможно потребуется авторизация.</Paragraph>

        <Paragraph>
          После прохождения авторизации появится страница с токеном, скопируйте
          его и вставьте на странице администратора вашего сайта.
        </Paragraph>

        <Paragraph type="danger">
          ⚠️ Никому не передавайте токен — он даёт доступ к файлам
        </Paragraph>
      </Modal>
    </>
  );
};

export default ModalHelpYandex;
