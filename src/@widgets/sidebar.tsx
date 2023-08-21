import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { keyframes, styled } from "styled-components";
import { Logo } from "../@assets";
import { useAuthStoreContext } from "../@store";
import { SearchPanel, SidebarAuthPanel, SidebarController } from "../@components";
import { Link } from "react-router-dom";
import config, { baseURIs, dev_version } from "../config";

const fadeSidebarMobile = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 0%;
  }
`;

const SidebarContainer = styled.div`
  position: sticky;
  top: 0;
  max-width: 260px;
  height: calc(100vh - 45px);
  max-height: 100%;
  width: 100%;
  background-color: rgba(249, 249, 249, 0.8);
  backdrop-filter: blur(70px);
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 25px;
  z-index: 999;
  @media (max-width: 1000px) {
    position: fixed;
    left: -100%;
    animation: ${fadeSidebarMobile} 0.2s ease-in forwards alternate;
    background: white;
    max-width: none;
    width: calc(100vw - 40px);
    height: calc(100vh - 105px);
    margin-top: 60px;
  }
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  height: 60px;
  background: white;
  width: calc(100% - 30px);
  z-index: 999;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  @media (min-width: 1000px) {
    display: none;
  }
`;

const SidebarMobileControl = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  @media (min-width: 1000px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 42px;
    height: 42px;
  }

  @media (max-width: 1000px) {
    display: none;
  }
`;

const LogoText = styled.div`
  font-weight: bold;
  font-weight: 600;
  font-size: 16px;
  margin-left: 12px;
`;

const SidebarLinks = styled.div`
  color: #818181;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  a.support {
    display: block;
    font-size: 13px;
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
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
  margin-right: 15px;
  span {
    width: 12px;
    height: 2px;
    background: black;
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

const MobileLogoContainer = styled(LogoContainer)`
  display: none;
  @media (max-width: 1000px) {
    display: flex;
  }
`;

const UserMobile = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-left: auto;
  img {
    width: 40px;
    height: 40px;
    border-radius: 32px;
    border: 1px solid #c7c7c7;
  }
`;

const UserMobileText = styled.p`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-left: 12px;
  color: var(--accentColor);
`;

const Sidebar: FC = observer(() => {
  const { user } = useAuthStoreContext();

  const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);
  const [mobileWidth, setMobileWidth] = useState<boolean>(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = (event: any) => {
      setMobileWidth(event.target.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <SidebarWrapper>
        {mobileWidth && (
          <SidebarMobileControl>
            {mobileSidebar ? (
              <CloseSidebar onClick={() => setMobileSidebar(false)}>
                <span></span>
                <span></span>
                <span></span>
              </CloseSidebar>
            ) : (
              <OpenSidebar onClick={() => setMobileSidebar(true)}>
                <span></span>
                <span></span>
                <span></span>
              </OpenSidebar>
            )}

            <MobileLogoContainer>
              <Link to={`${baseURIs.main}`} style={{ height: 42 }}>
                <Logo />
              </Link>
            </MobileLogoContainer>
            {!user._id ? (
              <SidebarLogin to={`${baseURIs.auth}/login`}>Войти</SidebarLogin>
            ) : (
              <UserMobile to={`${baseURIs.main}/profile/${user._id}`}>
                <img src={`${config.fileHost}/${user.avatar}`} alt="User Avatar" />
                <UserMobileText>
                  <span>{user.name}</span>
                  <span>{user.surname}</span>
                </UserMobileText>
              </UserMobile>
            )}
          </SidebarMobileControl>
        )}
      </SidebarWrapper>
      {(mobileSidebar || !mobileWidth) && (
        <SidebarContainer>
          <LogoContainer>
            <Logo />
            <LogoText>Helper</LogoText>
          </LogoContainer>
          <SearchPanel />
          {!user.name ? <SidebarAuthPanel /> : <SidebarController />}
          <SidebarLinks>
            <Link className={"support"} to={`${baseURIs.developers}`}>
              Разработчикам
            </Link>
            <a className={"support"} href="https://t.me/+G0fh6FON9AYxZGIy" target={"_blank"} rel="noreferrer">
              Чат Telegram
            </a>
            <Link className="support" to={`${baseURIs.main}/changelog`}>Версия {dev_version}</Link>
          </SidebarLinks>
        </SidebarContainer>
      )}
    </>
  );
});

export default Sidebar;
