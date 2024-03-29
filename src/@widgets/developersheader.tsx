import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { styled } from "styled-components";
import { Logo } from "../@assets";
import { useAuthStoreContext, useDevSidebarStoreContext } from "../@store";
import config, { baseURIs } from "../config";
import { Link, useNavigation } from "react-router-dom";
import { ThemeToggler } from "../@components";

const Header = styled.div`
  height: 50px;
  border-bottom: var(--developersBorder);
  position: sticky;
  top: 0;
  background: var(--developersContainerBackground);
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  z-index: 1;
`;

const HeaderContainer = styled.div`
  max-width: var(--developersWrapperWidth);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--primaryText);

  @media (max-width: 500px) {
    p {
      display: none;
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserAvatar = styled.div`
  background-color: #c7c7c7;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-position: 0px 80%;
  background-size: 100%;
`;

const UserText = styled.div``;
const UserName = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--primaryText);
`;
const UserEmail = styled(UserName)`
  font-size: 12px;
`;

const SidebarLogin = styled(Link)`
  font-size: 15px;
  border: 1px solid #c7c7c7;
  padding: 6px 12px;
  color: white;
  border-radius: 8px;
  color: #444;
  font-weight: 500;
  text-decoration: none;
  margin-left: auto;
`;

const OpenSidebar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #c7c7c7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3px;
  margin-right: 5px;
  span {
    width: 12px;
    height: 2px;
    background: var(--primaryText);
  }
  @media (min-width: 501px) {
    display: none;
  }
`;

const CloseSidebar = styled(OpenSidebar)`
  position: relative;
  span {
    position: absolute;
    width: 16px;
    &:first-child {
      transform: rotate(45deg);
    }
    &:last-child {
      transform: rotate(-45deg);
    }
    &:nth-child(2) {
      display: none;
    }
  }
`;

const DevelopersHeader: FC = observer(() => {
  const { user } = useAuthStoreContext();
  const { isDevSidebar, setDevSidebar } = useDevSidebarStoreContext();

  const navigate = useNavigation();

  useEffect(() => {
    setDevSidebar("false");
  }, [navigate, setDevSidebar]);

  return (
    <Header>
      <HeaderContainer>
        <LogoContainer>
          {isDevSidebar === "true" ? (
            <CloseSidebar onClick={() => setDevSidebar("false")}>
              <span></span>
              <span></span>
              <span></span>
            </CloseSidebar>
          ) : (
            <OpenSidebar onClick={() => setDevSidebar("true")}>
              <span></span>
              <span></span>
              <span></span>
            </OpenSidebar>
          )}
          <Logo size={40} />
          <p>Helper Разработчикам</p>
        </LogoContainer>
        <div style={{display: "flex", alignItems: "center", gap: 15}}>
          <ThemeToggler />
          {user.name ? (
            <UserContainer>
              <UserAvatar style={{ backgroundImage: `url(${config.API}/public/${user.avatar})` }} />
              <UserText>
                <UserName>{user.name}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserText>
            </UserContainer>
          ) : (
            <SidebarLogin to={`${baseURIs.auth}/login`}>Войти</SidebarLogin>
          )}
        </div>
      </HeaderContainer>
    </Header>
  );
});

export default DevelopersHeader;
