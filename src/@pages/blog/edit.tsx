import { observer } from "mobx-react";
import { Blog, PageProps, Response } from "../../@types";
import { FC, createRef, useEffect, useState } from "react";
import { BlogLayout } from "../../@layouts";
import { useNavigate, useParams } from "react-router-dom";
import $api from "../../@http";
import config, { baseURIs } from "../../config";
import { Button, ContainerTitle, FileLabel, Input, InputFile, Textarea } from "../../@shared";
import styled from "styled-components";
import { alert } from "../../@services";
import { useAuthStoreContext, useLoaderStore } from "../../@store";

const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin-top: 20px;
`;

const CoverImage = styled.div`
  width: 100%;
  height: calc(768px * 0.5);
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: background 0.2s;
  background-size: cover;
  cursor: pointer;
  @media (max-width: 768px) {
    height: calc(50vw);
  }
`;

const EditBlog: FC<PageProps> = observer(({ title }) => {
  const { id } = useParams();
  const { user } = useAuthStoreContext();
  const [post, setPost] = useState<Blog>({} as Blog);

  const navigate = useNavigate();

  const [postTitle, setPostTitle] = useState<string>("");
  const [postAuthor, setPostAuthor] = useState<string>("");
  const [postURI, setPostURI] = useState<string>("");
  const [postText, setPostText] = useState<string>("");

  const [fileName, setFileName] = useState<string>("");
  const fileInput: any = createRef();
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const { setLoaded } = useLoaderStore();

  useEffect(() => {
    $api.get<Response<Blog>>(`/blog/get?id=${id}`).then(({ data }) => {
      if (data.type === "error" || !data.data) return navigate(`${baseURIs.blog}`);
      setPost(data.data);
    });
  }, [id, navigate]);

  useEffect(() => {
    setPostTitle(post.title);
    setPostAuthor(post.description);
    setPostURI(post.link);
    setPostText(post.text);
    setUploadedFile(post.cover);
  }, [post]);

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

  const sendData = () => {
    $api.patch<Response<Blog>>(`/blog/edit`, { id: post._id, title: postTitle, description: postAuthor, link: postURI, text: postText, cover: uploadedFile, owner: user._id }).then(({data}) => {
      if(!data.data || data.type === "error") return alert("error", "Ошибка", data.message);
      navigate(`${baseURIs.blog}/${data.data.link}`);
    });
  };

  return (
    <BlogLayout title={title}>
      <Container>
        <ContainerTitle>Изменение поста</ContainerTitle>
        <Input value={postTitle} onChange={({ target }: any) => setPostTitle(target.value)} />
        <Input value={postAuthor} onChange={({ target }: any) => setPostAuthor(target.value)} />
        <Input value={postURI} onChange={({ target }: any) => setPostURI(target.value)} />
        <Textarea value={postText} onChange={({ target }: any) => setPostText(target.value)}></Textarea>
        <CoverImage style={uploadedFile ? { backgroundImage: `url(${config.fileHost}/${uploadedFile})` } : {}} />
        <FileLabel htmlFor="file">{fileName ? `Прикреплен файл ${uploadedFile}` : "Прикрепить другой файл на обложку"}</FileLabel>
        <InputFile type={"file"} id="file" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
        <Button onClick={sendData}>Сохранить изменения</Button>
      </Container>
    </BlogLayout>
  );
});

export default EditBlog;
