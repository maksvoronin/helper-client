import { FC, useState } from "react";
import { PageProps } from "../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../@layouts";
import { Button, Container, ContainerTitle, FormText, Input, StyledSelect, Textarea } from "../../@shared";
import { SeriesSelect, SystemSelect, RoadSelect } from "../../@components";

const JournalComments: FC<PageProps> = observer(({ title }) => {

  const [startTime, setStartTime] = useState<string>(new Date().toLocaleTimeString());
  const [finishTime, setFinishTime] = useState<string>(new Date().toLocaleTimeString());

  const [selectedRoad, setSelectedRoad] = useState<string>("");

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Журнал замечаний локомотива</ContainerTitle>
        <FormText>Начало работ</FormText>
        <Input type={"time"} value={startTime} onChange={({target}: any) => setStartTime(target.value)} />
        <FormText>Окончание работ</FormText>
        <Input type={"time"} value={finishTime} onChange={({target}: any) => setFinishTime(target.value)} />
        <FormText>Дорога</FormText>
        <RoadSelect onChange={(e) => setSelectedRoad(e)} />
        <FormText>ПТОЛ</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Приписка</FormText>
        <StyledSelect></StyledSelect>
        <FormText>Серия</FormText>
        <SeriesSelect onChange={() => {}} />
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
