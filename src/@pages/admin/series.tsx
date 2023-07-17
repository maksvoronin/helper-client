import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { PageProps, Response, Series } from "../../@types";
import { MainLayout } from "../../@layouts";
import { Button, Container, ContainerTitle, FormText, Input, Li, Ul } from "../../@shared";
import { styled } from "styled-components";
import $api from "../../@http";
import { alert } from "../../@services/alerting.service";

const SeriesContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CreateSeries: FC<PageProps> = observer(({ title }) => {
  const [series, setSeries] = useState<string>("");

  const [allSeries, setAllSeries] = useState<Series[]>([]);

  useEffect(() => {
    $api.get<Response<Series[]>>("/series/all").then(({data}) => {
      if(data.type === "error" || !data.data) return alert("error", "Ошибка данных", "Ошибка получения данных о сериях",  15);
      setAllSeries(data.data);
    });
  }, []);

  const sendData = () => {
    if(!series.trim()) {
      return alert("error", "Заполните форму", "Укажите название серии", 15);
    }
    $api.post<Response<string>>("/series/create", {name: series}).then(({data}) => {
      setSeries("");
      alert("default", "Успешно", "Вы добавили серию", 15);
    })
  }

  return (
    <MainLayout title={title}>
      <SeriesContainer>
        <ContainerTitle>Создание серии</ContainerTitle>
        <Input placeholder="Название серии" value={series} onChange={({ target }: any) => setSeries(target.value)} />
        <Button onClick={sendData}>Сохранить</Button>
        <FormText>Существующие серии:</FormText>
        <Ul>
          {
            allSeries.map(e => <Li key={e._id}>{e.name}</Li>)
          }
        </Ul>
      </SeriesContainer>
    </MainLayout>
  );
});

export default CreateSeries;
