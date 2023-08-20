import { observer } from "mobx-react";
import { FormStatus, PageProps, Response, User } from "../@types";
import { DefaultLayout } from "../@layouts";
import { FC, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Logo } from "../@assets";
import { Button, Input, Link } from "../@shared";
import { ResultField, RoadSelect } from "../@components";
import $api from "../@http";
import { useAuthStoreContext } from "../@store";
import { useNavigate } from "react-router-dom";
import { baseURIs } from "../config";

const RegisterWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--pageBackground);
  @media ((max-width: 500px) or (max-height: 650px)) {
    align-items: flex-start;
  }
`;

const RegisterForm = styled.div`
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
  gap: 20px;
  @media (max-width: 500px) {
    max-width: none;
    max-height: none;
    width: 100%;
    height: calc(100% - 90px);
    padding-top: 60px;
    justify-content: start;
  }
`;

const RegisterTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin: 0;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
`;

const Register: FC<PageProps> = observer(({ title }) => {

  const { user, setUser } = useAuthStoreContext();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [road, setRoad] = useState<string>("");
  const [work, setWork] = useState<string>("");

  const [error, setError] = useState<FormStatus>({} as FormStatus);

  useEffect(() => {
    if(user._id) {
      navigate("/");
    }
  }, [user._id, navigate]);

  const sendData = () => {
    if (!name.trim()) return setError({ status: false, message: "Укажите имя" });
    if (!surname.trim()) return setError({ status: false, message: "Укажите фамилию" });
    if (!phone.trim()) return setError({ status: false, message: "Укажите телефон" });
    if (!email.trim()) return setError({ status: false, message: "Укажите почту" });
    if (!password.trim()) return setError({ status: false, message: "Укажите пароль" });
    if (!repeatPassword.trim()) return setError({ status: false, message: "Укажите повтор пароля" });
    if (road === "0" || !road.trim()) return setError({ status: false, message: "Выберите дорогу" });
    if (!work.trim()) return setError({ status: false, message: "Укажите предприятие" });
    if (password !== repeatPassword) return setError({ status: false, message: "Пароли не совпадают" });

    $api.post<Response<{accessToken: string; refreshToken: string; user: User} | string>>(`/auth/registration`, { name, surname, phone, email, password, road, work }).then(({data}) => {
      if(data.type === "error" || typeof data.data! === "string") return setError({status: false, message: String(data.data!)});
      setUser(data.data!.user);
      localStorage.token = data.data!.accessToken;
      navigate("/activate");
    });
  };

  return (
    <DefaultLayout title={title}>
      <RegisterWrapper>
        <RegisterForm>
          <Logo />
          <RegisterTitle>Регистрация</RegisterTitle>
          <Row>
            <Input placeholder="Имя" value={name} onChange={({ target }: any) => setName(target.value)} />
            <Input placeholder="Фамилия" value={surname} onChange={({ target }: any) => setSurname(target.value)} />
          </Row>
          <Input placeholder="Ваш телефон" value={phone} onChange={({ target }: any) => setPhone(target.value)} />
          <Input placeholder="Ваша почта" value={email} onChange={({ target }: any) => setEmail(target.value)} />
          <Row>
            <Input type={"password"} placeholder="Пароль" value={password} onChange={({ target }: any) => setPassword(target.value)} />
            <Input type={"password"} placeholder="Повтор пароля" value={repeatPassword} onChange={({ target }: any) => setRepeatPassword(target.value)} />
          </Row>
          <RoadSelect onChange={(e) => setRoad(e)} />
          <Input placeholder="Предприятие" value={work} onChange={({ target }: any) => setWork(target.value)} />
          <Button onClick={sendData}>Зарегистрироваться</Button>
          <ResultField status={error.status} message={error.message} />
          <Link to={`${baseURIs.auth}/recovery`}>Восстановить пароль</Link>
          <Link to={`${baseURIs.auth}/login`}>Войти</Link>
        </RegisterForm>
      </RegisterWrapper>
    </DefaultLayout>
  );
});

export default Register;
