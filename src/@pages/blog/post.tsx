import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { BlogLayout } from "../../@layouts";
import { useNavigate, useParams } from "react-router-dom";
import $api from "../../@http";
import { Blog, Response } from "../../@types";
import styled from "styled-components";
import config, { baseURIs } from "../../config";
import { useAuthStoreContext, usePopupStoreContext } from "../../@store";
import { Button, CancelButton } from "../../@shared";
import { DeletePostBlog } from "../../@popups";

const Container = styled.div`
  margin-top: 32px;
`;

const BlogTitle = styled.h1`
  color: var(--primaryText);
  font-size: 28px;
  font-weight: 700;
  position: relative;
  margin: 0;
`;

const BlogAuthor = styled.p`
  position: relative;
  font-size: 14px;
  margin: 0;
  padding: 0;
  color: #777;
`;

const BlogParagraph = styled.pre`
  position: relative;
  margin: 0;
`;

const Header = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

const Article = styled.div`
  margin-top: 12px;
  gap: 12px;
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
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

const Post: FC = observer(() => {
  const { id } = useParams();
  const [post, setPost] = useState<Blog>({} as Blog);
  const { user } = useAuthStoreContext();
  const { setVisible, setTitle, setContent } = usePopupStoreContext();

  const navigate = useNavigate();

  useEffect(() => {
    $api.get<Response<Blog>>(`/blog/get?id=${id}`).then(({ data }) => {
      if (data.type === "error" || !data.data) return navigate(`${baseURIs.blog}`);
      setPost(data.data);
    });
  }, [id, navigate]);

  return (
    <BlogLayout title={`Блог / ${post.title}`}>
      <Container>
        <Header>
          <BlogTitle>{post.title}</BlogTitle>
          <BlogAuthor>{post.description}</BlogAuthor>
        </Header>
        <Article>
          <CoverImage style={post.cover ? { backgroundImage: `url(${config.fileHost}/${post.cover})` } : {}} />
        </Article>
        <BlogParagraph>{post.text}</BlogParagraph>
      </Container>
      {user.permissions > 2 && (
        <div style={{ display: "flex", gap: 10, flexDirection: "column", marginTop: 20 }}>
          <Button onClick={() => navigate(`${baseURIs.blog}/${post.link}/edit`)}>Изменить</Button>
          <CancelButton onClick={() => {
            setTitle("Удаление записи");
            setContent(<DeletePostBlog postId={`${post._id}`} />)
            setVisible(true);
          }}>Удалить</CancelButton>
        </div>
      )}
    </BlogLayout>
  );
});

export default Post;
