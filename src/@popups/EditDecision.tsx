import { observer } from "mobx-react";
import { FC, useState, createRef, useEffect } from "react";
import $api from "../@http";
import { Input, FileLabel, InputFile, Button } from "../@shared";
import { usePopupStoreContext, useLoaderStore } from "../@store";
import { Decision, Response } from "../@types";
import config from "../config";
import { alert } from "../@services";

const EditDecision: FC<{ decision: Decision; setDecision: any }> = observer(({ decision, setDecision }) => {
  const { setVisible } = usePopupStoreContext();
  const [text, setText] = useState<string>(decision.content);
  const [fileName, setFileName] = useState<string>("");
  const fileInput: any = createRef();
  const { setLoaded } = useLoaderStore();

  const [uploadedFile, setUploadedFile] = useState<string>("");

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
        alert("default", "Успешно", "Решение изменено");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const unlinkFile = (e?: any) => {
    setFileName("");
    setUploadedFile("");
    e && e.preventDefault();
  };

  const sendData = () => {
    setLoaded(true);
    $api.put<Response<Decision>>("/decision/edit", { id: decision._id, content: text, file: uploadedFile }).then(({ data }) => {
      if (data.type === "error" || typeof data.data === "string") return alert("error", "Ошибка", String(data.data!), 1.5);
      alert("default", "Успешно", "Решение изменено", 1.5);
      setDecision(data.data);
      setVisible(false);
      setLoaded(false);
    });
  };

  return (
    <>
      <Input placeholder="Текст решения" value={text} onChange={({ target }: any) => setText(target.value)} />
      <FileLabel
        htmlFor="file"
        onClick={(e: any) => {
          fileName && unlinkFile(e);
        }}
      >
        {fileName ? `Открепить файл ${uploadedFile}` : "Прикрепить другой файл к решению"}
      </FileLabel>
      <InputFile type={"file"} id="file" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
      <Button onClick={sendData}>Сохранить</Button>
    </>
  );
});

export default EditDecision;
