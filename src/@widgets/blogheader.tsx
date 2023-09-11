import { observer } from "mobx-react";
import { FC } from "react";
import styled from "styled-components";
import { Logo } from "../@assets";
import { Link } from "../@shared";
import { baseURIs } from "../config";

const HeaderContainer = styled.header`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background: white;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
`;

const BackLink = styled(Link)``;

const BlogHeader: FC = observer(() => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo size={32} />
        Блог
      </LogoContainer>
      <BackLink to={baseURIs.main || "/"}>Вернуться на сайт</BackLink>
    </HeaderContainer>
  );
});

export default BlogHeader;
