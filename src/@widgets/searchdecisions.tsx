import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Container, ContainerTitle, Select } from "../@shared";
import { styled } from "styled-components";
import { Comment, Decision, OptionValue, Response, System } from "../@types";
import $api from "../@http";
import { DecisionBlock } from "../@components";

const Text = styled.p`
  margin-bottom: 5px;
`;

const SearchDecisions: FC = observer(() => {
  const [systems, setSystems] = useState<System[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<System>();

  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment>();

  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    $api.get<Response<System[]>>(`/system/all`).then(({ data }) => {
      setSystems(data.data!);
    });
  }, []);

  useEffect(() => {
    if (selectedSystem) {
      $api.get<Response<Comment[]>>(`/comment/system?id=${selectedSystem._id}`).then(({ data }) => {
        setComments(data.data!);
      });
    }
  }, [selectedSystem]);

  useEffect(() => {
    if (selectedComment) {
      $api.get<Response<Decision[]>>(`/comment/decisions?id=${selectedComment._id}`).then(({ data }) => {
        setDecisions(data.data!);
      });
    }
  }, [selectedComment]);

  return (
    <>
      <Container>
        <ContainerTitle>Помощник поиска неисправностей</ContainerTitle>
        <Text>Система</Text>
        <Select defaultValue={{ value: 0, text: "Выберите систему" }} values={systems?.map((e) => ({ text: e.name, value: e } as OptionValue<System>))} onChange={(e) => setSelectedSystem(e.value as System)} />
        <Text>Замечание</Text>
        <Select defaultValue={{ value: 0, text: "Выберите замечание" }} values={comments?.map((e) => ({ text: e.content, value: e } as OptionValue<Comment>))} onChange={(e) => setSelectedComment(e.value as Comment)} />
      </Container>
      {
        decisions && decisions.map(e => <DecisionBlock key={e._id} decision={e} />)
      }
    </>
  );
});

export default SearchDecisions;
