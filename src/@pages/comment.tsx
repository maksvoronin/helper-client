import { observer } from "mobx-react";
import { FC, createRef, useEffect, useState } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { Button, Container, ContainerTitle, StyledSelect, Textarea } from "../@shared";
import { styled } from "styled-components";
import config from "../config";
import $api from "../@http";

const Text = styled.p`
  margin-bottom: 5px;
`;

const FileLabel = styled.label`
  width: 100%;
  text-align: center;
  display: block;
  border-radius: 12px;
  background: #e8f5ff00;
  color: white;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  color: var(--accentColor);

  &:hover {
    text-decoration: underline;
  }
`;

const InputFile = styled.input`
  display: none;
`;

const Comment: FC<PageProps> = observer(({ title }) => {
  const [fileName, setFileName] = useState<string>("");
  const fileInput: any = createRef();

  const [uploadedFile, setUploadedFile] = useState<string>("");

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

  const unlinkFile = (e: any) => {
    e.preventDefault();
    setFileName("");
    setUploadedFile("");
  };

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Добавление замечания</ContainerTitle>
        <Text>Выберите систему</Text>
        <StyledSelect>
          <option>Выберите систему</option>
        </StyledSelect>
        <Text>Выберите серию локомотива</Text>
        <StyledSelect>
          <option>Выберите серию локомотива</option>
        </StyledSelect>
        <Text>Напишите замечание</Text>
        <Textarea placeholder="Текст замечания" />
        <Text>Напишите решение</Text>
        <Textarea placeholder="Текст решения" />
        <FileLabel
          htmlFor="file"
          onClick={(e: any) => {
            fileName && unlinkFile(e);
          }}
        >
          {fileName ? `Открепить файл ${uploadedFile}` : "Прикрепить файл к решению"}
        </FileLabel>
        <InputFile type={"file"} id="file" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
        <Button>Сохранить</Button>
      </Container>
    </MainLayout>
  );
});

export default Comment;
