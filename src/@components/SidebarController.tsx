import { mdiCardsHeartOutline, mdiCogOutline, mdiCommentCheckOutline, mdiCommentQuestionOutline, mdiDatabase, mdiHomeOutline, mdiSecurity, mdiThumbUpOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { observer } from "mobx-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useAuthStoreContext } from "../@store";
import SidebarUserInfo from "./SidebarUserInfo";

const SidebarContainer = styled.div``;

const SidebarButtons = styled.div`
  width: 100%;
`;

const SidebarButton = styled(Link)`
  width: calc(100% - 30px);
  padding: 13px 15px;
  max-height: 42px;
  display: flex;
  background-color: rgba(255, 255, 255, 0.8);
  align-items: center;
  border-radius: 12px;
  border: 1px solid #c7c7c7;
  margin-top: 10px;
  font-size: 13px;
  user-select: none;
  cursor: pointer;
  transition: background 0.3s;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
  svg {
    margin-right: 7px;
    color: var(--accentColor);
    width: 20px;
    height: 20px;
    @media (max-width: var(--mobileWidth)) {
      margin-right: 0;
      width: 26px;
      height: 26px;
    }
  }
  span {
    @media (max-width: var(--mobileWidth)) {
      display: none;
    }
  }
  @media (max-width: var(--mobileWidth)) {
    padding: 5px;
    width: auto;
    background-color: transparent;
    border: none;
    margin-top: 0;
  }

  @media (max-width: var(--mobileWidth)) {
    &.secondary {
      display: none;
    }
  }
`;

const SidebarSeparator = styled.div`
  margin: 10px;
  background-color: #c7c7c7;
  width: calc(100% - 20px);
  height: 1px;
  @media (max-width: var(--mobileWidth)) {
    display: none;
  }
`;

const SidebarController: FC = observer(() => {
  const { user } = useAuthStoreContext();

  return (
    <SidebarContainer>
      <SidebarButtons>
        <SidebarButton to={"/"}>
          <Icon path={mdiHomeOutline} size={"20px"} />
          <span>Главная</span>
        </SidebarButton>
        <SidebarSeparator />
        <SidebarButton to={"/comment"}>
          <Icon path={mdiCommentQuestionOutline} size={"20px"} />
          <span>Добавить замечание</span>
        </SidebarButton>
        <SidebarButton to={"/decision"}>
          <Icon path={mdiCommentCheckOutline} size={"20px"} />
          <span>Добавить решение</span>
        </SidebarButton>
        <SidebarSeparator />
        <SidebarButton to={"/liked"}>
          <Icon path={mdiThumbUpOutline} size={"20px"} />
          <span>Полезные решения</span>
        </SidebarButton>
        <SidebarButton to={"/my"}>
          <Icon path={mdiDatabase} size={"20px"} />
          <span>Мои данные</span>
        </SidebarButton>
        <SidebarButton to={"/subscribed"}>
          <Icon path={mdiCardsHeartOutline} size={"20px"} />
          <span>Отслеживаемое</span>
        </SidebarButton>
        <SidebarSeparator />
        <SidebarButton to={"/settings"}>
          <Icon path={mdiCogOutline} size={"20px"} />
          <span>Настройки</span>
        </SidebarButton>
        {user.permissions > 2 && (
          <>
            <SidebarSeparator />
            <SidebarButton to={"/admin"}>
              <Icon path={mdiSecurity} size={"20px"} />
              <span>Управление</span>
            </SidebarButton>
          </>
        )}
      </SidebarButtons>
      <SidebarUserInfo />
    </SidebarContainer>
  );
});

export default SidebarController;
