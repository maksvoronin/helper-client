import { observer } from "mobx-react";
import { FC, useEffect } from "react";
import { Container } from "../@shared";
import { Decision } from "../@types";
import { styled } from "styled-components";
import Icon from "@mdi/react";
import { mdiHeartOutline } from "@mdi/js";
import { Commentaries } from "../@widgets";
import config from "../config";

const DecisionText = styled.p`
  margin: 0;
  padding: 0;
`;

const UserInfo = styled.div`
  display: flex;
  border-top: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-style: italic;
  color: #565656;
  font-weight: 500;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
    padding: 0;
  }
`;

const DecisionAttachement = styled.div`
  margin-top: 5px;
`;

const LikeButton = styled.button`
  margin: 0;
  background: transparent;
  border: none;
  transition: background 0.2s, transform 0.2s;
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(0.94);
  }
`;

const AttachmentVideo = styled.video`
  max-width: 100%;
`;

const AttachmentImage = styled.img`
  max-width: 100%;
`;

const AttachmentLink = styled.a`
  text-decoration: none;
  color: var(--accentColor);
  &:hover {
    text-decoration: underline;
  }
`;

const extname = (filename: string): string => {
  return `.${filename.split(".").pop()}` || "";
};

const DecisionBlock: FC<{ decision: Decision }> = observer(({ decision }) => {
  useEffect(() => {}, []);
  return (
    <Container>
      <DecisionText>{decision.content}</DecisionText>
      {decision.file && (
        <DecisionAttachement>
          {config.imageExt.includes(extname(decision.file)) ? (
            <AttachmentImage src={`${config.fileHost}/${decision.file}`} />
          ) : config.videoExt.includes(extname(decision.file)) ? (
            <AttachmentVideo src={`${config.fileHost}/${decision.file}`} controls />
          ) : (
            <AttachmentLink href={`${config.fileHost}/${decision.file}`} target="_blank">Прикрепленный файл</AttachmentLink>
          )}
        </DecisionAttachement>
      )}
      <UserInfo>
        <p>
          {decision.by.name} {decision.by.surname} • {new Date(decision.created).toLocaleString("ru")}
        </p>
        <LikeButton>
          <Icon path={mdiHeartOutline} size={"16px"} />
        </LikeButton>
      </UserInfo>
      <Commentaries type="decision" comments={decision.comments} />
    </Container>
  );
});

export default DecisionBlock;
