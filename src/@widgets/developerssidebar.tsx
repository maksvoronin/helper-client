import { observer } from "mobx-react";
import { FC } from "react";
import { styled } from "styled-components";
import { ListButton } from "../@components";
import { Link } from "react-router-dom";
import { useAuthStoreContext, useDevSidebarStoreContext } from "../@store";
import { baseURIs } from "../config";

const Sidebar = styled.div<{ mobilevisible: "true" | "false" }>`
  max-width: 240px;
  width: 100%;
  position: sticky;
  top: 0px;
  @media (max-width: 500px) {
    position: fixed;
    left: ${(props) => (props.mobilevisible === "true" ? "0%" : "-100%")};
    top: 50px;
    max-width: none;
    padding-left: 15px;
    padding-right: 15px;
    background: white;
    padding-top: 20px;
    padding-bottom: 20px;
    height: calc(100% - 90px);
    width: calc(100% - 30px);
    overflow: auto;
    transition: left 0.2s;
  }
`;

const Paragraph = styled.p`
  font-weight: 500;
  margin: 0;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  margin-top: 5px;
  &:nth-child(1) {
    margin-top: 0;
  }
`;

const NavButton = styled(Link)`
  font-size: 13px;
  text-decoration: none;
  color: var(--textPrimary, #555);
  padding: 4px 10px;
  border-radius: 8px;
  display: block;
  &:hover {
    background: rgba(100, 100, 100, 0.1);
  }
`;

const docsURL = `${baseURIs.developers}/docs`;
const style = { padding: "4px 10px" };
const marginButtons = 15;

const DevelopersSidebar: FC = observer(() => {
  const { isDevSidebar } = useDevSidebarStoreContext();
  const { user } = useAuthStoreContext();

  return (
    <Sidebar mobilevisible={String(isDevSidebar) as unknown as "true" | "false"}>
      <Paragraph>Введение</Paragraph>
      <ListButton btnText="Приложение" marginButtons={marginButtons} style={style}>
        <NavButton to={`${docsURL}/createapp`}>Создание приложения</NavButton>
      </ListButton>
      <ListButton btnText="Работа с API" marginButtons={marginButtons} style={style}>
        <NavButton to={`${docsURL}/create`}>Создание приложения</NavButton>
      </ListButton>
      <Paragraph>Методы</Paragraph>
      <ListButton btnText="system" marginButtons={marginButtons} style={style}>
        <NavButton to={`${docsURL}/methods/system`}>О методах</NavButton>
        <NavButton to={`${docsURL}/methods/system/all`}>all</NavButton>
        <NavButton to={`${docsURL}/methods/system/get`}>get</NavButton>
      </ListButton>
      <ListButton btnText="series" marginButtons={marginButtons} style={style}>
        <NavButton to={`${docsURL}/methods/series`}>О методах</NavButton>
        <NavButton to={`${docsURL}/methods/series/all`}>all</NavButton>
        <NavButton to={`${docsURL}/methods/series/get`}>get</NavButton>
      </ListButton>
      <ListButton btnText="search" marginButtons={marginButtons} style={style}>
        <NavButton to={`${docsURL}/methods/search`}>О методах</NavButton>
        <NavButton to={`${docsURL}/methods/search/get`}>get</NavButton>
      </ListButton>
      <ListButton btnText="decision" marginButtons={marginButtons} style={style}>
        <NavButton to={`${docsURL}/methods/decision`}>О методах</NavButton>
        <NavButton to={`${docsURL}/methods/decision/all`}>all</NavButton>
        <NavButton to={`${docsURL}/methods/decision/get`}>get</NavButton>
        <NavButton to={`${docsURL}/methods/decision/user`}>user</NavButton>
      </ListButton>
      <ListButton btnText="comment" marginButtons={marginButtons} style={style}>
        <NavButton to={`${docsURL}/methods/comment`}>О методах</NavButton>
        <NavButton to={`${docsURL}/methods/comment/all`}>all</NavButton>
        <NavButton to={`${docsURL}/methods/comment/get`}>get</NavButton>
        <NavButton to={`${docsURL}/methods/comment/user`}>user</NavButton>
        <NavButton to={`${docsURL}/methods/comment/system`}>system</NavButton>
      </ListButton>
      <ListButton btnText="user" marginButtons={marginButtons} style={style}>
        <NavButton to={`${docsURL}/methods/user`}>О методах</NavButton>
        <NavButton to={`${docsURL}/methods/user/get`}>get</NavButton>
      </ListButton>
      {user && user.createdapps && user.createdapps.length > 0 && (
        <>
          <Paragraph>Приложения</Paragraph>
          {user &&
            user.createdapps &&
            user.createdapps.map((e) => (
              <NavButton to={`${baseURIs.developers}/apps/${e._id}`} key={e._id}>
                {e.name}
              </NavButton>
            ))}
            <NavButton to={`${baseURIs.developers}/apps`}>Мои приложения</NavButton>
        </>
      )}
      <Paragraph>Настройки</Paragraph>
      <NavButton to={`${baseURIs.main || "/"}`}>Вернуться на сайт</NavButton>
    </Sidebar>
  );
});

export default DevelopersSidebar;
