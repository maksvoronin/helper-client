import { FC, createRef, useEffect, useState } from "react";
import { Background, PageProps, Response } from "../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../@layouts";
import { AdminContainer, Button, ContainerText, ContainerTitle, FileLabel, Input, InputFile, StyledSelect } from "../../@shared";
import $api from "../../@http";
import config from "../../config";
import { alert } from "../../@services/alerting.service";

const CreateBackground: FC<PageProps> = observer(({ title }) => {
  const [name, setName] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const fileInput: any = createRef();

  useEffect(() => {
    if (fileName) {
      const formData = new FormData();
      formData.append("file", fileInput.current.files[0]);
      formData.append("project", "helper");
      formData.append("comment", "Comment");
      $api.post(`${config.fileUpload}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then(({ data }) => setUploadedFile(data.data.file));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const unlinkFile = (e?: any) => {
    setFileName("");
    setUploadedFile("");
    e && e.preventDefault();
  };

  const sendData = () => {
    $api.post<Response<string>>("/background/create", { title: name, type: "image", content: uploadedFile }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Ошибка", data.data!, 15);
      alert("default", "Успешно", "Фон добавлен!", 15);
    });
  };

  return (
    <MainLayout title={title}>
      <AdminContainer>
        <ContainerTitle>Добавление фона</ContainerTitle>
        <Input placeholder="Название фона" value={name} onChange={({ target }: any) => setName(target.value)} />
        <FileLabel
          htmlFor="file"
          onClick={(e: any) => {
            fileName && unlinkFile(e);
          }}
        >
          {fileName ? `Открепить файл ${uploadedFile}` : "Загрузить файл"}
        </FileLabel>
        <InputFile type={"file"} id="file" accept="image/*" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
        <Button onClick={sendData}>Сохранить</Button>
      </AdminContainer>
    </MainLayout>
  );
});

export const DeleteBackground: FC<PageProps> = observer(({ title }) => {
  const [selectedBackground, setSelectedBackground] = useState<string | number>(0);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);

  useEffect(() => {
    $api.get<Response<Background[]>>("/background/all").then(({ data }) => {
      setBackgrounds(data.data!);
    });
  }, []);

  const sendData = () => {
    $api.post(`/background/edit`, { id: selectedBackground, visible: false }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Ошибка", data.message, 15);
      alert("default", "Успешно", "Вы успешно скрыли фон", 15);
    });
  };

  return (
    <MainLayout title={title}>
      <AdminContainer>
        <ContainerTitle>Удаление фона</ContainerTitle>
        <ContainerText>Выберите фон</ContainerText>
        <StyledSelect value={selectedBackground} onChange={({ target }: any) => setSelectedBackground(target.value)}>
          <option value={0} disabled>
            Выберите фон
          </option>
          {backgrounds.map((e) => (
            <option key={e._id} value={e._id}>{e.title} {!e.visible && <i>(скрыт)</i>}</option>
          ))}
        </StyledSelect>
        <Button onClick={sendData}>Удалить</Button>
      </AdminContainer>
    </MainLayout>
  );
});

export default CreateBackground;
