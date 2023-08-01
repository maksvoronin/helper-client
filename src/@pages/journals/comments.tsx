import { FC, useState } from "react";
import { PageProps } from "../../@types";
import { observer } from "mobx-react";
import { MainLayout } from "../../@layouts";
import { Button, Container, ContainerTitle, FormText, Input, StyledSelect, Textarea } from "../../@shared";
import { BlokSelect, JournalMoveSelect, LokomotiveNumber, PostScriptSelect, PostnumberSelect, PtolSelect, RoadSelect, SectionSelect, SeriesSelect, SystemSelect, UserSelect } from "../../@components";

const JournalComments: FC<PageProps> = observer(({ title }) => {
  const [startTime, setStartTime] = useState<string>(new Date().toLocaleTimeString());
  const [finishTime, setFinishTime] = useState<string>(new Date().toLocaleTimeString());

  const [selectedRoad, setSelectedRoad] = useState<string>("");
  const [selectedPtol, setSelectedPtol] = useState<string>("");
  const [selectedPostScript, setSelectedPostScript] = useState<string>("");
  const [selectedLokomotive, setSelectedLokomotive] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedMove, setSelectedMove] = useState<string>("");
  const [selectedSystem, setSelectedSystem] = useState<string>("");
  const [selectedBlok, setSelectedBlok] = useState<string>("");
  const [replacementInJournal, setReplacementInJournal] = useState<string>("");
  const [numberMark, setNumberMark] = useState<string>("");
  const [numberWithDraw, setNumberWithDraw] = useState<string>("");
  const [timeRepair, setTimeRepair] = useState<string>("");
  const [notePTOL, setNotePTOL] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedPostNumber, setSelectedPostNumber] = useState<string>("");

  return (
    <MainLayout title={title}>
      <Container>
        <ContainerTitle>Журнал замечаний локомотива</ContainerTitle>
        <FormText>Начало работ</FormText>
        <Input type={"time"} value={startTime} onChange={({ target }: any) => setStartTime(target.value)} />
        <FormText>Окончание работ</FormText>
        <Input type={"time"} value={finishTime} onChange={({ target }: any) => setFinishTime(target.value)} />
        <FormText>Дорога</FormText>
        <RoadSelect onChange={(e) => setSelectedRoad(e)} />
        <FormText>ПТОЛ</FormText>
        <PtolSelect onChange={(e) => setSelectedPtol(e)} />
        <FormText>Приписка</FormText>
        <PostScriptSelect onChange={(e) => setSelectedPostScript(e)} />
        <FormText>Серия</FormText>
        <SeriesSelect onChange={() => {}}></SeriesSelect>
        <FormText>Номер локомотива</FormText>
        <LokomotiveNumber onChange={(e) => setSelectedLokomotive(e)} />
        <FormText>Секция</FormText>
        <SectionSelect onChange={(e) => setSelectedSection(e)} />
        <FormText>Замена в журнале ТУ-152</FormText>
        <Textarea placeholder="Замена в журнале ТУ-152" value={replacementInJournal} onChange={({target}: any) => setReplacementInJournal(target.value)} />
        <FormText>Что сделали</FormText>
        <JournalMoveSelect onChange={(e) => setSelectedMove(e)} />
        <FormText>Система</FormText>
        <SystemSelect onChange={(e) => setSelectedSystem(e)} journals></SystemSelect>
        <FormText>БЛОК</FormText>
        <BlokSelect onChange={(e) => setSelectedBlok(e)} />
        <FormText>Номер бирки снятия</FormText>
        <Input placeholder="Номер бирки снятия" value={numberMark} onChange={({target}: any) => setNumberMark(target.value)} />
        <FormText>Снят №</FormText>
        <Input placeholder="Снят №" value={numberWithDraw} onChange={({target}: any) => setNumberMark(target.value)} />
        <FormText>Срок ремонта снятого</FormText>
        <Input type={"time"} value={timeRepair} onChange={({target}: any) => setTimeRepair(target.value)} />
        <FormText>Пост №</FormText>
        <PostnumberSelect onChange={(e) => setSelectedPostNumber(e)} />
        <FormText>Примечание ПТОЛ</FormText>
        <Textarea placeholder="Примечание ПТОЛ" value={notePTOL} onChange={({target}: any) => setNotePTOL(target.value)} />
        <FormText>ФИО</FormText>
        <UserSelect onChange={(e) => setSelectedUser(e)} defaultAuthed />
        <Button style={{ marginTop: 20 }}>Сохранить</Button>
      </Container>
    </MainLayout>
  );
});

export default JournalComments;
