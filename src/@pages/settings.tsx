import { observer } from "mobx-react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { FC, useState } from "react";
import { Button, Container, ContainerTitle, Input, InputFile } from "../@shared";
import { styled } from "styled-components";
import { useAuthStoreContext } from "../@store";
import config from "../config";

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

const Settings: FC<PageProps> = observer(({ title }) => {
  const { user } = useAuthStoreContext();

  const [name, setName] = useState<string>(user.name);
  const [surname, setSurname] = useState<string>(user.surname);
  const [phone, setPhone] = useState<string>(user.phone);

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle style={{marginBottom: 20}}>Аккаунт</ContainerTitle>
        <RowUserInfo>
          <Avatar htmlFor="avatar" style={{ backgroundImage: `url(${config.fileHost}/${user.avatar})` }} />
          <InputFile type="file" id="avatar" accept="image/*" />
          <ColumnUserInfo>
            <RowUserInfo>
              <ColumnUserInput>
                <p>Имя</p>
                <Input placeholder="Ваше имя" onChange={({target}: any) => setName(target.value)} value={name}  />
              </ColumnUserInput>
              <ColumnUserInput>
                <p>Фамилия</p>
                <Input placeholder="Ваша фамилия" onChange={({target}: any) => setSurname(target.value)} value={surname} />
              </ColumnUserInput>
            </RowUserInfo>
            <ColumnUserInput>
              <p>Телефон</p>
              <Input placeholder={"Номер телефона"} onChange={({target}: any) => setPhone(target.value)} value={phone} />
            </ColumnUserInput>
            <Button>Сохранить</Button>
          </ColumnUserInfo>
        </RowUserInfo>
      </Container>

      <Container>
        <ContainerTitle>Настройки сайта</ContainerTitle>
      </Container>
    </MainLayout>
  );
});

export default Settings;
