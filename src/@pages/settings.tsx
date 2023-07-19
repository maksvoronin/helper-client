import { observer } from "mobx-react";
import { Background, PageProps, Response } from "../@types";
import { MainLayout } from "../@layouts";
import { FC, useEffect, useState } from "react";
import { Button, Container, ContainerTitle, Input, InputFile } from "../@shared";
import { styled } from "styled-components";
import { useAuthStoreContext } from "../@store";
import config from "../config";
import $api from "../@http";
import { alert } from "../@services/alerting.service";

const Avatar = styled.label`
  width: 200px;
  height: 200px;
  display: block;
  background-color: #c7c7c7;
  border-radius: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  &::before {
    content: "Нажмите, чтобы изменить";
    width: 100%;
    height: 100%;
    border-radius: 300px;
    opacity: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    color: white;
    transition: opacity 0.2s;
  }
  &:hover {
    &::before {
      opacity: 1;
    }
  }
`;

const RowUserInfo = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ColumnUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ColumnUserInput = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 0;
  }
`;

const Backgrounds = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 20px;
  flex-wrap: wrap;
`;

const BackgroundBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  cursor: pointer;
  img {
    width: 258px;
    height: 130px;
    border-radius: 8px;
  }
  p {
    text-align: center;
  }
`;

const ActiveBackgroundBlock = styled(BackgroundBlock)`
  background-color: #c7c7c7;
`;

const LogoutButton = styled(Button)`
  background: #ff3a3a;
`;

const Settings: FC<PageProps> = observer(({ title }) => {
  const { user, setUser } = useAuthStoreContext();

  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordNew, setPasswordNew] = useState<string>("");

  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<Background>();

  const newUser = user;

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setSurname(user.surname);
      setPhone(user.phone);
      setEmail(user.email);
    }
  }, [user.name, user.surname, user.phone, user.email, user._id]);

  useEffect(() => {
    $api.get<Response<Background[]>>("/background/all").then(({ data }) => {
      setBackgrounds(data.data!);
    });
    user.background && setSelectedBackground(user.background);
  }, [user]);

  useEffect(() => {
    if (selectedBackground && selectedBackground._id !== newUser.background._id) {
      $api.post<Response<string>>(`/user/settings/background`, { background: selectedBackground._id }).then(({ data }) => {
        alert("default", data.message, data.data!, 15);
        newUser.background = selectedBackground;
        setUser(newUser);
      });
    }
  }, [selectedBackground, newUser, setUser]);

  const sendUserData = () => {
    if (user.name !== name) {
      $api.post<Response<string>>(`/user/settings/name`, { name }).then(({ data }) => {
        alert("default", "Успешно", data.data!, 15);
        newUser.name = name;
        setUser(newUser);
      });
    }
    if (user.surname !== surname) {
      $api.post<Response<string>>(`/user/settings/surname`, { surname }).then(({ data }) => {
        alert("default", "Успешно", data.data!, 15);
        newUser.surname = surname;
        setUser(newUser);
      });
    }

    if (phone && phone !== user.phone) {
      $api.post(`/user/settings/phone`, { phone }).then(({ data }) => {
        alert("default", "Успешно", data.data!, 15);
        newUser.phone = phone;
        setUser(newUser);
      });
    }
  };

  const sendUserSecurity = () => {
    if (email && email !== user.email) {
      $api.post<Response<string>>(`/user/security/email`, { email }).then(({ data }) => {
        alert("default", "Смена почты", data.data!, 15);
        newUser.email = email;
        setUser(newUser);
      });
    }
    if (password || passwordNew) {
      if (!password) {
        return alert("error", "Смена пароля", "Укажите текущий пароль", 15);
      }

      if (!passwordNew) {
        return alert("error", "Смена пароля", "Укажите новый пароль", 15);
      }

      $api.post<Response<string>>(`${config.API}/user/security/password`, { prev: password, password: passwordNew }).then(({ data }) => {
        if (data.type === "error") {
          alert("error", "Смена пароля", data.message!, 15);
        } else {
          alert("default", "Смена пароля", data.message!, 15);
        }
      });
    }
  };

  const userLogout = () => {
    localStorage.removeItem("token");
    $api.post("/auth/logout");
    window.location.href = "/";
  };

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle style={{ marginBottom: 20 }}>Аккаунт</ContainerTitle>
        <RowUserInfo>
          <Avatar htmlFor="avatar" style={{ backgroundImage: `url(${config.fileHost}/${user.avatar})` }} />
          <InputFile type="file" id="avatar" accept="image/*" />
          <ColumnUserInfo>
            <RowUserInfo>
              <ColumnUserInput>
                <p>Имя</p>
                <Input placeholder="Ваше имя" onChange={({ target }: any) => setName(target.value)} value={name} />
              </ColumnUserInput>
              <ColumnUserInput>
                <p>Фамилия</p>
                <Input placeholder="Ваша фамилия" onChange={({ target }: any) => setSurname(target.value)} value={surname} />
              </ColumnUserInput>
            </RowUserInfo>
            <ColumnUserInput>
              <p>Телефон</p>
              <Input placeholder={"Номер телефона"} onChange={({ target }: any) => setPhone(target.value)} value={phone} />
            </ColumnUserInput>
            <Button onClick={sendUserData}>Сохранить</Button>
          </ColumnUserInfo>
        </RowUserInfo>
      </Container>

      <Container>
        <ContainerTitle>Настройки сайта</ContainerTitle>
        <Backgrounds>
          {backgrounds &&
            backgrounds.map((e) =>
              e.visible ? (
                selectedBackground?.content === e.content ? (
                  <ActiveBackgroundBlock key={e._id}>
                    <img src={`${config.fileHost}/${e.content}`} alt={"Page background"} />
                    <p>{e.title}</p>
                  </ActiveBackgroundBlock>
                ) : (
                  <BackgroundBlock onClick={() => setSelectedBackground(e)} key={e._id}>
                    <img src={`${config.fileHost}/${e.content}`} alt={"Page background"} />
                    <p>{e.title}</p>
                  </BackgroundBlock>
                )
              ) : (
                <div key={e._id}></div>
              ),
            )}
        </Backgrounds>
      </Container>

      <Container>
        <ContainerTitle>Настройки безопасности</ContainerTitle>
        <ColumnUserInfo>
          <RowUserInfo>
            <ColumnUserInput>
              <p>Почта</p>
              <Input placeholder={"Ваша почта"} onChange={({ target }: any) => setEmail(target.value)} value={email} />
            </ColumnUserInput>
          </RowUserInfo>
          <RowUserInfo>
            <ColumnUserInput>
              <p>Пароль</p>
              <Input type={"password"} placeholder="Пароль" onChange={({ target }: any) => setPassword(target.value)} value={password} />
            </ColumnUserInput>
            <ColumnUserInput>
              <p>Новый пароль</p>
              <Input type={"password"} placeholder="Новый пароль" onChange={({ target }: any) => setPasswordNew(target.value)} value={passwordNew} />
            </ColumnUserInput>
          </RowUserInfo>
          <ColumnUserInfo>
            <Button onClick={sendUserSecurity}>Сохранить</Button>
            <LogoutButton onClick={userLogout}>Выйти</LogoutButton>
          </ColumnUserInfo>
        </ColumnUserInfo>
      </Container>
    </MainLayout>
  );
});

export default Settings;
