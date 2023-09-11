import { FC, useEffect, useState } from "react";
import { Blog, PageProps, Response } from "../../@types";
import { observer } from "mobx-react";
import { BlogLayout } from "../../@layouts";
import $api from "../../@http";
import { alert } from "../../@services";
import styled from "styled-components";
import { Button, ContainerTitle } from "../../@shared";
import { BlogCard } from "../../@components";
import { useAuthStoreContext } from "../../@store";
import { baseURIs } from "../../config";
import { useNavigate } from "react-router-dom";

const Title = styled(ContainerTitle)`
  text-align: left;
`;

const BlogList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const AllPosts: FC<PageProps> = observer(({ title }) => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const { user } = useAuthStoreContext();
  const navigate = useNavigate();

  useEffect(() => {
    $api.get<Response<Blog[]>>(`/blog/all`).then(({ data }) => {
      if (!data.data || data.type === "error") return alert("error", "Ошибка", data.message);
      setPosts(data.data.reverse());
    });
  }, []);

  return (
    <BlogLayout title={title}>
      <Title>Новости Helper</Title>
      <BlogList>
        {posts.map((e) => (
          <BlogCard post={e} key={e._id} />
        ))}
      </BlogList>
      {user.permissions > 2 && (
        <Button onClick={() => navigate(`${baseURIs.blog}/create`)} style={{ marginTop: 20 }}>
          Создать пост
        </Button>
      )}
    </BlogLayout>
  );
});

export default AllPosts;
