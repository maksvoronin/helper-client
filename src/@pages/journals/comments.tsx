import { FC } from "react";
import { PageProps } from "../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../@layouts";
import { Button, Container, ContainerTitle, FormText, Input, StyledSelect, Textarea } from "../../@shared";
import { SeriesSelect, SystemSelect } from "../../@components";

const JournalComments: FC<PageProps> = observer(({ title }) => {
  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Журнал замечаний локомотива</ContainerTitle>
        <FormText>Начало работ</FormText>
        <Input type={"time"} value={new Date().toLocaleTimeString()} />
        <FormText>Окончание работ</FormText>
        <Input type={"time"} value={new Date().toLocaleTimeString()} />
        <FormText>ПТОЛ</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Приписка</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Серия</FormText>
        <SeriesSelect onChange={() => {}}></SeriesSelect>
        <FormText>Номер локомотива</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Секция</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Замена в журнале ТУ-152</FormText>
        <Textarea />
        <FormText>Что сделали</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Система</FormText>
        <SystemSelect onChange={() => {}} journals></SystemSelect>
        <FormText>БЛОК</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Номер бирки снятия</FormText>
        <Input />
        <FormText>Снят №</FormText>
        <Input />
        <FormText>Срок ремонта снятого</FormText>
        <Input type={"time"} />
        <FormText>Пост №</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Примечание ПТОЛ</FormText>
        <Textarea />
        <FormText>ФИО</FormText>
        <StyledSelect></StyledSelect>
        <Button style={{marginTop: 20}}>Сохранить</Button>
      </Container>
    </MainLayout>
  );
});

export default JournalComments;
