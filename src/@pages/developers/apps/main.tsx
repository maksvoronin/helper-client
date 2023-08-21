import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { Application, PageProps, Response } from "../../../@types";
import { DevelopersLayout } from "../../../@layouts";
import { Button, DevTitle } from "../../../@shared";
import { useAuthStoreContext } from "../../../@store";
import $api from "../../../@http";
import { alert } from "../../../@services";
import { styled } from "styled-components";
import { baseURIs } from "../../../config";
import { useNavigate } from "react-router-dom";
import { AppsCard } from "../../../@components";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  button {
    width: auto;
    padding-left: 15px;
    padding-right: 15px;
    height: 32px;
    background-color: rgb(230, 240, 255);
    color: #3072ff;
  }
`;

const AppsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  @media (max-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 1040px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Apps: FC<PageProps> = observer(({ title }) => {
  const { user } = useAuthStoreContext();
  const [apps, setApps] = useState<Application[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user._id) {
      $api.get<Response<Application[]>>(`/application/user_all?id=${user._id}`).then(({ data }) => {
        if (!data.data) return alert("error", "Ошибка", data.message);
        setApps(data.data);
      });
    }
  });

  return (
    <DevelopersLayout title={title}>
      <Row>
        <DevTitle>Мои приложения</DevTitle>
        <Button onClick={() => navigate(`${baseURIs.developers}/apps/create`)}>Создать приложение</Button>
      </Row>
      <AppsContainer>
        {apps && apps.map((e) => <AppsCard app={e} key={e._id}></AppsCard>)}
      </AppsContainer>
    </DevelopersLayout>
  );
});

export default Apps;
