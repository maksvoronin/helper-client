import { observer } from "mobx-react";
import { FC, createRef, useEffect, useState } from "react";
import { FormStatus, PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { Button, Container, ContainerTitle, Textarea } from "../@shared";
import { styled } from "styled-components";
import config from "../config";
import $api from "../@http";
import { useNavigate } from "react-router-dom";
import { ResultField, SeriesSelect, SystemSelect } from "../@components";

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
  const [selectedSystem, setSelectedSystem] = useState<string>("");

  const [selectedSeries, setSelectedSeries] = useState<string>("");

  const [comment, setComment] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [fileName, setFileName] = useState<string>("");
  const fileInput: any = createRef();

  const [uploadedFile, setUploadedFile] = useState<string>("");

  const navigate = useNavigate();

  const [postData, setPostData] = useState<FormStatus>({} as FormStatus);

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

  const sendData = () => {
    $api.post(`${config.API}/comment/create`, { system: selectedSystem, series: selectedSeries, comment }).then(({ data }) => {
      if (data.type === "error") {
        return setPostData({ status: false, message: data.data });
      }
      $api.post(`${config.API}/decision/create`, { comment: data.data._id, content, file: uploadedFile }).then(({ data }) => {
        if (data.type === "error") {
          return setPostData({ status: false, message: data.data });
        } else {
          return setPostData({ status: true, message: "Успешно!" });
        }
      });
      navigate(`/comment/${data.data._id}`);
    });
  };

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Добавление замечания</ContainerTitle>
        <Text>Выберите систему</Text>
        <SystemSelect onChange={(e: string) => setSelectedSystem(e)} />
        <Text>Выберите серию локомотива</Text>
        <SeriesSelect onChange={(e: string) => setSelectedSeries(e)} />
        <Text>Напишите замечание</Text>
        <Textarea placeholder="Текст замечания" value={comment} onChange={({ target }: any) => setComment(target.value)} />
        <Text>Напишите решение</Text>
        <Textarea placeholder="Текст решения" value={content} onChange={({ target }: any) => setContent(target.value)} />
        <FileLabel
          htmlFor="file"
          onClick={(e: any) => {
            fileName && unlinkFile(e);
          }}
        >
          {fileName ? `Открепить файл ${uploadedFile}` : "Прикрепить файл к решению"}
        </FileLabel>
        <InputFile type={"file"} id="file" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
        <Button onClick={sendData}>Сохранить</Button>
        <ResultField status={postData.status} message={postData.message} />
      </Container>
    </MainLayout>
  );
});

export default Comment;
