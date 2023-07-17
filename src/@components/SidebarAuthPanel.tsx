import { observer } from "mobx-react";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button, Link as LinkStyled } from "../@shared";
import { mdiHomeOutline } from "@mdi/js";
import Icon from "@mdi/react";

const SidebarAuthPanelContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  @media (max-width: var(--mobileWidth)) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .join {
      width: 40%;
    }
    a {
      width: 100%;
    }
  }
`;

const InfoText = styled.p`
  line-height: 1.46;
  margin: 0;
`;

const ButtonRegister = styled(Button)`
  border: 1px solid #d8d8d8;
  background-color: white;
  color: black;

  @media (max-width: var(--mobileWidth)) {
    width: 58%;
  }
`;

const RecoveryLink = styled(LinkStyled)`
  display: block;
  text-align: center;
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

const SidebarAuthPanel: FC = observer(() => {
  const navigate = useNavigate();

  return (
    <SidebarAuthPanelContainer>
      <SidebarButton to={"/"}>
        <Icon path={mdiHomeOutline} size={"20px"} />
        <span>Главная</span>
      </SidebarButton>
      <InfoText>Для использования всех возможностей сервиса Вам необходимо авторизоваться</InfoText>
      <Button onClick={() => navigate("/login")}>Войти</Button>
      <ButtonRegister onClick={() => navigate("/register")}>Зарегистрироваться</ButtonRegister>
      <RecoveryLink to="/recovery" onClick={() => navigate("/recovery")}>
        Восстановить аккаунт
      </RecoveryLink>
    </SidebarAuthPanelContainer>
  );
});

export default SidebarAuthPanel;
