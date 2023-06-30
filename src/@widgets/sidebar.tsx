import { observer } from "mobx-react";
import { FC } from "react";
import { styled } from "styled-components";
import { Logo } from "../@assets";
import { useAuthStoreContext } from "../@store";
import { SearchPanel, SidebarAuthPanel, SidebarController } from "../@components";

const SidebarContainer = styled.div`
  position: sticky;
  top: 0;
  max-width: 260px;
  height: calc(100vh - 40px);
  max-height: 100%;
  width: 100%;
  background-color: rgba(249, 249, 249, 0.8);
  backdrop-filter: blur(70px);
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-top: 25px;

  @media (max-width: $mobileWidth) {
    position: fixed;
    top: calc(100% - 36px - 40px);
    bottom: 0px;
    left: 0px;
    width: calc(100% - 40px);
    max-height: 36px;
    max-width: none;
    z-index: 999;
    border-radius: 0px;
    align-items: center;
    flex-direction: row;
    gap: 8px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 42px;
    height: 42px;
  }

  @media (max-width: $mobileWidth) {
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
  @media (max-width: $mobileWidth) {
    display: none;
  }
`;

const Sidebar: FC = observer(() => {
  const { user } = useAuthStoreContext();

  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo />
        <LogoText>Helper</LogoText>
      </LogoContainer>
      <SearchPanel />
      {!user.name ? <SidebarAuthPanel /> : <SidebarController />}
      <SidebarLinks>
        <a className={"support"} href="https://chat.whatsapp.com/LVS4gxkE85HDwCHAA77AJ3" target={"_blank"} rel="noreferrer">
          Чат WhatsApp
        </a>
        <a className={"support"} href="https://t.me/+G0fh6FON9AYxZGIy" target={"_blank"} rel="noreferrer">
          Чат Telegram
        </a>
      </SidebarLinks>
    </SidebarContainer>
  );
});

export default Sidebar;
