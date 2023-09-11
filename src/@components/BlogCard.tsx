import { FC } from "react";
import { Blog } from "../@types";
import { observer } from "mobx-react";
import styled from "styled-components";
import config, { baseURIs } from "../config";
import { Link } from "../@shared";

const BlogCover = styled.img`
  width: 100%;
  height: calc((768px / 2) * 0.5);
  @media (max-width: 812px) {
    height: calc(25vw);
  }

  @media(max-width: 600px) {
    height: 50vw;
  }
`;

const BlogTitle = styled.h1`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const BlogContainer = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  &:hover {
    text-decoration: none;
    ${BlogTitle} {
      text-decoration: underline;
    }
  }
`;

const BlogDescription = styled.p`
  color: var(--primaryText);
  text-decoration: none;
  margin: 0;
  padding: 0;
`;

const BlogDate = styled.p`
  color: var(--primaryText);
  opacity: 0.4;
  text-decoration: none;
  margin: 0;
  padding: 0;
`;

const BlogCard: FC<{ post: Blog }> = observer(({ post }) => {
  return (
    <BlogContainer to={`${baseURIs.blog}/${post.link}`}>
      <BlogCover src={`${config.fileHost}/${post.cover}`} alt={post.title} />
      <BlogTitle>{post.title}</BlogTitle>
      <BlogDescription>{post.description}</BlogDescription>
      <BlogDate>{new Date(post.created).toLocaleDateString("ru")}</BlogDate>
    </BlogContainer>
  );
});

export default BlogCard;
