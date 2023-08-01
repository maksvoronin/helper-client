import {
  mdiBookAlertOutline,
  mdiCardsHeartOutline,
  mdiChevronRight,
  mdiCogOutline,
  mdiCommentCheckOutline,
  mdiCommentQuestionOutline,
  mdiDatabase,
  mdiHomeOutline,
  mdiPodiumGold,
  mdiSecurity,
  mdiThumbUpOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { observer } from "mobx-react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useAuthStoreContext } from "../@store";
import SidebarUserInfo from "./SidebarUserInfo";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SidebarButtons = styled.div`
  width: 100%;
`;

const SidebarButton = styled(Link)`
  width: calc(100% - 20px);
  padding: 8px 10px;
  max-height: 32px;
  display: flex;
  background: transparent;
  align-items: center;
  border-radius: 8px;
  font-size: 13px;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(0.98);
  }
  svg {
    margin-right: 7px;
    color: var(--accentColor);
    width: 20px;
    height: 20px;
  }
`;

const SidebarListButton = styled.div`
  width: calc(100% - 20px);
  padding: 8px 10px;
  max-height: 32px;
  display: flex;
  background: transparent;
  align-items: center;
  border-radius: 8px;
  font-size: 13px;
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  color: black;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(1);
  }
  svg {
    margin-right: 7px;
    color: var(--accentColor);
    width: 20px;
    height: 20px;
  }
  svg.arrow {
    color: #838383;
    margin-left: auto;
    margin-right: 0;
    transition: transform 0.2s;
    &.openned {
      transform: rotate(90deg);
    }
  }
`;

const ListButton = styled.div``;

const Buttons = styled.div`
  margin-left: 27px;
`;

const SidebarController: FC = observer(() => {
  const { user } = useAuthStoreContext();

  const [journalsOpenned, setJournalsOpenned] = useState<boolean>(false);

  return (
    <SidebarContainer>
      <SidebarButtons>
        <SidebarButton to={"/"}>
          <Icon path={mdiHomeOutline} size={"20px"} />
          <span>Главная</span>
        </SidebarButton>
        <SidebarButton to={"/comment"}>
          <Icon path={mdiCommentQuestionOutline} size={"20px"} />
          <span>Добавить замечание</span>
        </SidebarButton>
        <SidebarButton to={"/decision"}>
          <Icon path={mdiCommentCheckOutline} size={"20px"} />
          <span>Добавить решение</span>
        </SidebarButton>
        <ListButton>
          <SidebarListButton onClick={() => setJournalsOpenned((prev) => !prev)}>
            <Icon path={mdiBookAlertOutline} size={"20px"} />
            <span>Журналы</span>
            <Icon path={mdiChevronRight} size={"20px"} className={`arrow ${journalsOpenned && "openned"}`} />
          </SidebarListButton>
          {journalsOpenned && (
            <Buttons>
              <SidebarButton to={""}>Журнал замечаний локомотива</SidebarButton>
            </Buttons>
          )}
        </ListButton>
        <SidebarButton to={"/liked"}>
          <Icon path={mdiThumbUpOutline} size={"20px"} />
          <span>Полезные решения</span>
        </SidebarButton>
        <SidebarButton to={"/my"}>
          <Icon path={mdiDatabase} size={"20px"} />
          <span>Мои данные</span>
        </SidebarButton>
        <SidebarButton to={"/favorite"}>
          <Icon path={mdiCardsHeartOutline} size={"20px"} />
          <span>Избранное</span>
        </SidebarButton>
        <SidebarButton to={"/settings"}>
          <Icon path={mdiCogOutline} size={"20px"} />
          <span>Настройки</span>
        </SidebarButton>
        <SidebarButton to={"/rating"}>
          <Icon path={mdiPodiumGold} size={"20px"} />
          <span>Рейтинг</span>
        </SidebarButton>
        {user.permissions > 2 && (
          <>
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
