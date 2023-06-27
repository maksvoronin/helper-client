import { observer } from "mobx-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Button, Link } from "../@shared";

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

const RecoveryLink = styled(Link)`
  display: block;
  text-align: center;
`;

const SidebarAuthPanel: FC = observer(() => {
  const navigate = useNavigate();

  return (
    <SidebarAuthPanelContainer>
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
