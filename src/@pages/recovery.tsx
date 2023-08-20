import { FC, useEffect, useState } from "react";
import { FormStatus, PageProps } from "../@types";
import { observer } from "mobx-react";
import { DefaultLayout } from "../@layouts";
import { styled } from "styled-components";
import { Button, Input, Link } from "../@shared";
import { ResultField } from "../@components";
import { alert } from "../@services";
import $api from "../@http";
import { baseURIs } from "../config";

const RecoveryWrapper = styled.div`
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

const RecoveryForm = styled.div`
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

const RecoveryTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin: 0;
  text-align: center;
`;

const Recovery: FC<PageProps> = observer(({ title }) => {
  const [email, setEmail] = useState<string>("");

  const [result, setResult] = useState<FormStatus>({} as FormStatus);

  const sendData = () => {
    if (!email || email === "") {
      return setResult({ status: false, message: "Укажите почту" });
    }
    $api.post(`/auth/recovery`, { email }).then(({ data }) => {
      if (data.type === "error") {
        return alert("error", "Ошибка", data.message, 1.5);
      }
      alert("default", "Успешно", "Новый пароль отправлен на почту", 1.5);
    });
  };

  useEffect(() => {
    setResult({ status: true, message: "" });
  }, [email]);

  return (
    <DefaultLayout title={title}>
      <RecoveryWrapper>
        <RecoveryForm>
          <RecoveryTitle>Восстановление аккаунта</RecoveryTitle>
          <Input placeholder="Ваша почта" value={email} onChange={({ target }: any) => setEmail(target.value)} />
          <Button onClick={sendData}>Восстановить</Button>
          <ResultField status={result.status} message={result.message} />
          <Link to={`${baseURIs.auth}/register`}>Регистрация</Link>
          <Link to={`${baseURIs.auth}/login`}>Войти</Link>
        </RecoveryForm>
      </RecoveryWrapper>
    </DefaultLayout>
  );
});

export default Recovery;
