import { ResultField, SeriesSelect, SystemSelect } from "../@components";
import { Button, FileLabel, FormText, InputFile, Textarea } from "../@shared";
import { FC, createRef, useEffect, useState } from "react";
import config from "../config";
import $api from "../@http";
import { useNavigate } from "react-router-dom";
import { FormStatus } from "../@types";
import { observer } from "mobx-react";
import { useLoaderStore } from "../@store";

const CreateComment: FC = observer(() => {
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const { setLoaded } = useLoaderStore();

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
      setLoaded(true);
      const formData = new FormData();
      formData.append("file", fileInput.current.files[0]);
      formData.append("project", "helper");
      formData.append("comment", "Comment");
      $api.post(`${config.fileUpload}`, formData, { headers: { "Content-Type": "multipart/form-data" } }).then(({ data }) => {
        setUploadedFile(data.data.file);
        setLoaded(false);
      });
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
    <>
      <FormText>Выберите систему</FormText>
      <SystemSelect onChange={(e: string) => setSelectedSystem(e)} />
      <FormText>Выберите серию локомотива</FormText>
      <SeriesSelect onChange={(e: string) => setSelectedSeries(e)} />
      <FormText>Напишите замечание</FormText>
      <Textarea placeholder="Текст замечания" value={comment} onChange={({ target }: any) => setComment(target.value)} />
      <FormText>Напишите решение</FormText>
      <Textarea placeholder="Текст решения" value={content} onChange={({ target }: any) => setContent(target.value)} />
      <FileLabel
        htmlFor="file"
        onClick={(e: any) => {
          fileName && unlinkFile(e);
        }}
        style={{marginTop: 10, marginBottom: 15}}
      >
        {fileName ? `Открепить файл ${uploadedFile}` : "Прикрепить файл к решению"}
      </FileLabel>
      <InputFile type={"file"} id="file" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
      <Button onClick={sendData}>Сохранить</Button>
      <ResultField status={postData.status} message={postData.message} />
    </>
  );
});

export default CreateComment;
