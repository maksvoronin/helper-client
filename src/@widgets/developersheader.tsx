import { observer } from "mobx-react";
import { FC } from "react";
import { styled } from "styled-components";
import { Logo } from "../@assets";

const Header = styled.div`
  height: 50px;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  background: white;
  display: flex;
  align-items: center;
`;

const HeaderContainer = styled.div`
  max-width: var(--developersWrapperWidth);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DevelopersHeader: FC = observer(() => {
  return (
    <Header>
      <HeaderContainer>
        <LogoContainer>
          <Logo size={40} />
          <p>Helper Developers</p>
        </LogoContainer>
      </HeaderContainer>
    </Header>
  );
});

export default DevelopersHeader;
