import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Container, ContainerTitle, StyledSelect } from "../@shared";
import { styled } from "styled-components";
import { Comment, Decision, Response, System } from "../@types";
import $api from "../@http";
import { DecisionBlock } from "../@components";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiShareOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";

const Text = styled.p`
  margin-bottom: 5px;
`;

const ControlButton = styled.button`
  height: 36px;
  border: none;
  background: transparent;
  width: 100%;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.2s, transform 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ControlRow = styled.div`
  display: flex;
  margin-top: 14px;
`;

const SearchDecisions: FC = observer(() => {
  const [systems, setSystems] = useState<System[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<string>();

  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<string>();

  const [decisions, setDecisions] = useState<Decision[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    $api.get<Response<System[]>>(`/system/all`).then(({ data }) => {
      setSystems(data.data!);
    });
  }, []);

  useEffect(() => {
    if (selectedSystem) {
      $api.get<Response<Comment[]>>(`/comment/system?id=${selectedSystem}`).then(({ data }) => {
        setComments(data.data!);
      });
    }
  }, [selectedSystem]);

  useEffect(() => {
    if (selectedComment) {
      $api.get<Response<Decision[]>>(`/comment/decisions?id=${selectedComment}`).then(({ data }) => {
        setDecisions(data.data!);
      });
    }
  }, [selectedComment]);

  return (
    <>
      <Container>
        <ContainerTitle>Помощник поиска неисправностей</ContainerTitle>
        <Text>Система</Text>
        <StyledSelect defaultValue={0} onChange={({ target }: any) => setSelectedSystem(target.value)}>
          <option value={0} disabled>
            Выберите систему
          </option>
          {systems?.map((e) => (
            <option value={e._id} key={e._id}>
              {e.name}
            </option>
          ))}
        </StyledSelect>
        {/* <Select defaultValue={{ value: 0, text: "Выберите систему" }} values={systems?.map((e) => ({ text: e.name, value: e } as OptionValue<System>))} onChange={(e) => setSelectedSystem(e.value as System)} /> */}
        <Text>Замечание</Text>
        <StyledSelect defaultValue={0} onChange={({ target }: any) => setSelectedComment(target.value)}>
          <option value={0} disabled>
            Выберите замечание
          </option>
          {comments?.map((e) => (
            <option value={e._id} key={e._id}>
              {e.content}
            </option>
          ))}
        </StyledSelect>
        {/* <Select defaultValue={{ value: 0, text: "Выберите замечание" }} values={comments?.map((e) => ({ text: e.content, value: e } as OptionValue<Comment>))} onChange={(e) => setSelectedComment(e.value as Comment)} /> */}
        <ControlRow>
          {selectedSystem && (
            <ControlButton>
              <Icon path={mdiHeartOutline} size={"18px"} />
              Отслеживать систему
            </ControlButton>
          )}
          {selectedComment && (
            <ControlButton>
              <Icon path={mdiHeartOutline} size={"18px"} />
              Отслеживать замечание
            </ControlButton>
          )}
          {selectedComment && (
            <ControlButton onClick={() => navigate(`/comment/${selectedComment}`)}>
              <Icon path={mdiShareOutline} size={"18px"} />
              Страница замечания
            </ControlButton>
          )}
        </ControlRow>
      </Container>
      {decisions.length > 0 && decisions.map((e) => <DecisionBlock key={e._id} decision={e} />)}
    </>
  );
});

export default SearchDecisions;
