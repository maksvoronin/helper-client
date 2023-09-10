import { observer } from "mobx-react";
import { Blog, PageProps, Response } from "../../@types";
import { FC, createRef, useEffect, useState } from "react";
import { BlogLayout } from "../../@layouts";
import styled, { keyframes } from "styled-components";
import { Button } from "../../@shared";
import $api from "../../@http";
import config, { baseURIs } from "../../config";
import { alert } from "../../@services";
import { useLoaderStore } from "../../@store";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin-top: 32px;
`;

const BlogTitle = styled.h1<{ placeholder: string; label: string; edited: string }>`
  color: var(--primaryText);
  font-size: 28px;
  font-weight: 700;
  position: relative;
  margin: 0;

  &::before {
    content: "${(props) => props.placeholder}";
    position: absolute;
    left: 0;
    right: 0;
    color: rgba(0, 0, 0, 0.44);
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    pointer-events: none;
    opacity: ${({ edited }) => (edited === "false" ? "1" : "0")};
    visibility: ${({ edited }) => (edited === "false" ? "visible" : "hidden")};
    transition: opacity 0.15s ease;
  }
  @media (min-width: 1119px) {
    &::after {
      position: absolute;
      content: "${(props) => props.label}";
      color: rgba(0, 0, 0, 0.44);
      border-right: 1px solid rgba(0, 0, 0, 0.15);
      right: 100%;
      top: -6px;
      bottom: -6px;
      padding: 6px 12px;
      font-weight: 400;
      margin: 0 21px;
      opacity: 0;
      visibility: ${({ edited }) => (edited === "true" ? "visible" : "hidden")};
      opacity: ${({ edited }) => (edited === "true" ? "1" : "0")};
      transition: opacity 0.15s ease;
    }
  }
`;

const BlogAuthor = styled.p<{ placeholder: string; label: string; edited: string }>`
  position: relative;
  font-size: 14px;
  margin: 0;
  padding: 0;
  color: #777;
  &::before {
    content: "${(props) => props.placeholder}";
    position: absolute;
    left: 0;
    right: 0;
    color: rgba(0, 0, 0, 0.44);
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    pointer-events: none;
    opacity: ${({ edited }) => (edited === "false" ? "1" : "0")};
    visibility: ${({ edited }) => (edited === "false" ? "visible" : "hidden")};
    transition: opacity 0.15s ease;
  }
  @media (min-width: 1119px) {
    &::after {
      position: absolute;
      content: "${(props) => props.label}";
      color: rgba(0, 0, 0, 0.44);
      border-right: 1px solid rgba(0, 0, 0, 0.15);
      right: 100%;
      top: -6px;
      bottom: -6px;
      padding: 6px 12px;
      font-weight: 400;
      margin: 0 21px;
      opacity: 0;
      visibility: ${({ edited }) => (edited === "true" ? "visible" : "hidden")};
      opacity: ${({ edited }) => (edited === "true" ? "1" : "0")};
      transition: opacity 0.15s ease;
    }
  }
`;

const BlogParagraph = styled.pre<{ placeholder: string; label: string; edited: string }>`
  position: relative;
  margin: 0;
  &::before {
    content: "${(props) => props.placeholder}";
    position: absolute;
    left: 0;
    right: 0;
    color: rgba(0, 0, 0, 0.44);
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    pointer-events: none;
    opacity: ${({ edited }) => (edited === "false" ? "1" : "0")};
    visibility: ${({ edited }) => (edited === "false" ? "visible" : "hidden")};
    transition: opacity 0.15s ease;
  }
  @media (min-width: 1119px) {
    &::after {
      position: absolute;
      content: "${(props) => props.label}";
      color: rgba(0, 0, 0, 0.44);
      border-right: 1px solid rgba(0, 0, 0, 0.15);
      right: 100%;
      top: -6px;
      bottom: -6px;
      padding: 6px 12px;
      font-weight: 400;
      margin: 0 21px;
      opacity: 0;
      visibility: ${({ edited }) => (edited === "true" ? "visible" : "hidden")};
      opacity: ${({ edited }) => (edited === "true" ? "1" : "0")};
      transition: opacity 0.15s ease;
    }
  }
`;

const BlogURI = styled(BlogAuthor)``;

const Header = styled.div<{ focusarticle: string }>`
  display: flex;
  gap: 12px;
  flex-direction: column;
  ${({ focusarticle: focusArticle }) =>
    focusArticle === "true" &&
    `${BlogTitle}::after {
    opacity: 0;
    visibility: hidden;
  }`}
  ${({ focusarticle: focusArticle }) =>
    focusArticle === "true" &&
    `${BlogAuthor}::after {
    opacity: 0;
    visibility: hidden;
  }`}
`;

const Article = styled.div<{ focusarticle: string }>`
  margin-top: 12px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  ${({ focusarticle: focusArticle }) =>
    focusArticle === "false" &&
    `${BlogParagraph}::after {
    opacity: 0;
    visibility: hidden;
  }`};
`;

const CoverImage = styled.label`
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
  p {
    text-align: center;
    width: 100%;
  }
  input,
  label {
    display: none;
  }
  &:hover {
    background-color: #dfdfdf;
  }
`;

const fadeButton = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const PublicButton = styled(Button)`
  animation: ${fadeButton} 0.4s;
`;

const CreateBlog: FC<PageProps> = observer(({ title }) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postAuthor, setPostAuthor] = useState<string>(``);
  const [postURI, setPostURI] = useState<string>("");

  const [focusArticle, setFocusArticle] = useState<boolean>(false);
  const [firstText, setFirstText] = useState<string>("");

  const titleRef: any = createRef();
  const authorRef: any = createRef();
  const uriRef: any = createRef();
  const firstParagraph: any = createRef();

  const [fileName, setFileName] = useState<string>("");
  const fileInput: any = createRef();
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const { setLoaded } = useLoaderStore();
  const navigate = useNavigate();

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
        alert("default", "Успешно", "Обложка загружена");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const sendData = () => {
    if (postTitle && postAuthor && postURI && uploadedFile && firstText) {
      $api.post<Response<Blog>>(`/blog/create`, { title: postTitle, description: postAuthor, link: postURI, cover: uploadedFile, text: firstText }).then(({ data }) => {
        if (data.type === "error" || !data.data) return alert("error", "Ошибка", data.message);
        alert("default", "Успешно", data.message);
        navigate(`${baseURIs.blog}/${postURI}`);
      });
    }
  };

  return (
    <BlogLayout title={title}>
      <Container>
        <Header onClick={() => setFocusArticle(false)} focusarticle={`${focusArticle}`} onFocus={() => setFocusArticle(false)}>
          <BlogTitle
            contentEditable
            placeholder="Название"
            label="Название"
            onInput={(e: any) => setPostTitle(e.currentTarget.textContent || "")}
            edited={`${postTitle !== ""}`}
            ref={titleRef}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                e.preventDefault();
                authorRef.current.focus();
              }
              if (e.key === "ArrowDown") {
                authorRef.current.focus();
              }
              if (e.key === "ArrowRight" && postTitle.length < 1) authorRef.current.focus();
            }}
          />
          <BlogAuthor
            contentEditable
            placeholder="Ваше имя"
            label="Автор"
            onInput={(e: any) => setPostAuthor(e.currentTarget.textContent || "")}
            edited={`${postAuthor !== ""}`}
            ref={authorRef}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                e.preventDefault();
                authorRef.current.focus();
              }
              if (e.key === "ArrowUp") titleRef.current.focus();
              if (e.key === "ArrowLeft" && postAuthor.length < 1) titleRef.current.focus();
              if (e.key === "ArrowRight" && postAuthor.length < 1) uriRef.current.focus();
              if (e.key === "ArrowDown") uriRef.current.focus();
            }}
          />
          <BlogURI
            contentEditable
            placeholder="Ссылка на статью"
            label="URI"
            onInput={(e: any) => setPostURI(e.currentTarget.textContent || "")}
            edited={`${postURI !== ""}`}
            ref={uriRef}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                e.preventDefault();
                authorRef.current.focus();
              }
              if (e.key === " ") e.preventDefault();
              if (e.key === "ArrowUp") authorRef.current.focus();
              if (e.key === "ArrowLeft" && postURI.length < 1) authorRef.current.focus();
              if (e.key === "ArrowRight" && postURI.length < 1) firstParagraph.current.focus();
              if (e.key === "ArrowDown") firstParagraph.current.focus();
            }}
          />
        </Header>
        <Article onClick={() => setFocusArticle(true)} focusarticle={`${focusArticle}`} onFocus={() => setFocusArticle(true)}>
          <CoverImage style={uploadedFile ? { backgroundImage: `url(${config.fileHost}/${uploadedFile})` } : {}} htmlFor="file">
            {!uploadedFile && <p>Прикрепите изображение</p>}
            <input type="file" id="file" onChange={({ target }: any) => setFileName(target.value)} ref={fileInput} />
          </CoverImage>
          <BlogParagraph
            contentEditable
            placeholder="Начало длинной истории..."
            label="Контент"
            edited={`${firstText !== ""}`}
            onInput={(e: any) => setFirstText(e.target.innerText)}
            ref={firstParagraph}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                setFirstText(firstText + `<br/>`);
                console.log(firstText);
              }
              if (e.key === "Backspace" && firstText.length < 1) {
                authorRef.current.focus();
              }
              if (e.key === "ArrowUp") uriRef.current.focus();
              if (e.key === "ArrowLeft" && firstText.length < 1) uriRef.current.focus();
            }}
          />
        </Article>
        {postTitle && postAuthor && postURI && uploadedFile && firstText && <PublicButton onClick={sendData}>Опубликовать</PublicButton>}
      </Container>
    </BlogLayout>
  );
});

export default CreateBlog;
