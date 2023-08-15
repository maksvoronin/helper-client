import { FC, useEffect, useState } from "react";
import { PageProps } from "../@types";
import { observer } from "mobx-react";
import { DefaultLayout } from "../@layouts";
import { styled } from "styled-components";
import { Button, ContainerText, Input, Link } from "../@shared";
import { Logo } from "../@assets";
import { useAuthStoreContext } from "../@store";
import { useNavigate } from "react-router-dom";
import $api from "../@http";
import { alert } from "../@services";

const ActivateWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--pageBackground);
  @media ((max-width: 500px) or (max-height: 650px)) {
    align-items: flex-start;
  }
`;

const ActivateForm = styled.div`
  max-width: 320px;
  width: 100%;
  background-color: white;
  border-radius: 12px;
  box-shadow: var(--blockBoxShadow);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 15px;
  @media (max-width: 500px) {
    max-width: none;
    max-height: none;
    width: 100%;
    height: calc(100% - 90px);
    padding-top: 60px;
    justify-content: start;
  }
`;

const ActivateTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin: 0;
  text-align: center;
`;

const Activate: FC<PageProps> = observer(({ title }) => {
  const { user, isAuth } = useAuthStoreContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>(user.email || "");

  useEffect(() => {
    if(user.isActivated || !isAuth) {
      return navigate("/");
    }
    setEmail(user.email);
  }, [user, isAuth, navigate]);

  const sendData = () => {
    $api.post(`/user/security/email`, { email }).then(({ data }: any) => {
      if (data.type === 'error') {
        return alert('error', 'Укажите почту', data.data, 1.5);
      } 
      alert("default", "Успешно", "Письмо отправлено, почта изменена", 15)
    });
  };

  return (
    <DefaultLayout title={title}>
      <ActivateWrapper>
        <ActivateForm>
          <Logo />
          <ActivateTitle>Подтвердите свою почту</ActivateTitle>
          <ContainerText style={{ lineHeight: 1.41, marginTop: 0 }}>
            Благодарим за пользование нашим сервисом, но для корректной работы Вам необходимо подтвердить свой аккаунт, перейдя по ссылке в письме, которое мы отправим на <b>Вашу почту.</b>
          </ContainerText>
          <ContainerText style={{ marginTop: 0 }}>
            Если Вы уже перешли по ссылке, то{" "}
            <Link to={"/"} style={{ fontSize: 16 }}>
              обновите страницу
            </Link>
          </ContainerText>
          <Input placeholder="Ваша почта" value={email} onChange={({ target }: any) => setEmail(target.value)} />
          <Button onClick={sendData}>Отправить письмо</Button>
        </ActivateForm>
      </ActivateWrapper>
    </DefaultLayout>
  );
});

export default Activate;
