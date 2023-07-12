import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Container, ContainerTitle } from "../@shared";
import { styled } from "styled-components";
import { Comment, Decision, Response } from "../@types";
import $api from "../@http";
import { CommentSelect, DecisionBlock, SystemSelect } from "../@components";
import Icon from "@mdi/react";
import { mdiHeartOutline, mdiShareOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { useAuthStoreContext } from "../@store";

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
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const SearchDecisions: FC = observer(() => {
  const { user } = useAuthStoreContext();

  const [selectedSystem, setSelectedSystem] = useState<string>();

  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<string>();

  const [decisions, setDecisions] = useState<Decision[]>([]);

  const navigate = useNavigate();

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
        <SystemSelect onChange={(e: string) => setSelectedSystem(e)} />
        <Text>Замечание</Text>
        <CommentSelect comments={comments} onChange={(e: string) => setSelectedComment(e)} />
        {user.name && (
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
        )}
      </Container>
      {decisions.length > 0 && decisions.map((e) => <DecisionBlock key={e._id} decision={e} />)}
    </>
  );
});

export default SearchDecisions;
