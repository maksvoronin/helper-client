import { FC, useEffect, useState, createRef } from "react";
import { Button, FileLabel, FormText, InputFile, Textarea } from "../@shared";
import { CommentSelect, ResultField, SystemSelect } from "../@components";
import { Comment, FormStatus, Response } from "../@types";
import $api from "../@http";
import config from "../config";

const CreateDecision: FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>("");

  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<string>("");

  const [content, setContent] = useState<string>("");

  const [fileName, setFileName] = useState<string>("");
  const fileInput: any = createRef();

  const [uploadedFile, setUploadedFile] = useState<string>("");


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

  const unlinkFile = (e?: any) => {
    setFileName("");
    setUploadedFile("");
    e && e.preventDefault();
  };

  const sendData = () => {
    $api.post(`/decision/create`, { comment: selectedComment, content, file: uploadedFile }).then(({ data }) => {
      if (data.type === "error") {
        return setPostData({ status: false, message: data.data });
      } else {
        setContent("");
        unlinkFile();
        return setPostData({ status: true, message: "Успешно!" });
      }
    });
  };

  useEffect(() => {
    if (selectedSystem) {
      $api.get<Response<Comment[]>>(`/comment/system?id=${selectedSystem}`).then(({ data }) => {
        setComments(data.data!);
      });
    }
  }, [selectedSystem]);

  return (
    <>
      <FormText>Выберите систему</FormText>
      <SystemSelect onChange={(e: string) => setSelectedSystem(e)} />
      <FormText>Выберите решение</FormText>
      <CommentSelect comments={comments} onChange={(e: string) => setSelectedComment(e)} />
      <FormText>Напишите решение</FormText>
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
    </>
  );
};

export default CreateDecision;
