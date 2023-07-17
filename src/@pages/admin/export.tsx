import { observer } from "mobx-react";
import { PageProps } from "../../@types";
import { MainLayout } from "../../@layouts";
import { AdminContainer, Button, ContainerTitle } from "../../@shared";
import { FC } from "react";
import { alert } from "../../@services/alerting.service";
import $api from "../../@http";

const Export: FC<PageProps> = observer(({ title }) => {

  const exportToday = () => {
    $api.get(`stat/export?params=mini`).then(({data}) => {
      console.log(data);
      alert("default", "Успешно", "Экспорт за день отправлен на почту", 15);
    });
  }

  const exportFull = () => {
    $api.get(`/stat/export`).then(({data}) => {
      console.log(data);
      alert("default", "Успешно", "Полный экспорт отправлен на почту", 15);
    });
  }

  return (
    <MainLayout title={title}>
      <AdminContainer>
        <ContainerTitle>Экспорт данных</ContainerTitle>
        <Button onClick={exportToday}>Экспортировать за сегодня</Button>
        <Button onClick={exportFull}>Экспортировать полностью</Button>
      </AdminContainer>
    </MainLayout>
  );
});

export default Export;
