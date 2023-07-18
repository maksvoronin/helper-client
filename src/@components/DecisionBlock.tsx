import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { Container } from "../@shared";
import { Decision, Response } from "../@types";
import { styled } from "styled-components";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import { Commentaries } from "../@widgets";
import config from "../config";
import { Link } from "react-router-dom";
import { useAuthStoreContext } from "../@store";
import $api from "../@http";
import { alert } from "../@services/alerting.service";

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
    a {
      text-decoration: none;
      color: var(--accentColor);
      &:hover {
        text-decoration: underline;
      }
    }
    @media (max-width: 1000px) {
      font-size: 14px;
    }
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
  const { user, setUser } = useAuthStoreContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const newUser = user;

  useEffect(() => {
    // if (user.likedDecisions) user.likedDecisions.length > 0 && setIsLiked(user.likedDecisions.includes(decision));
  }, [user, decision]);

  const like = () => {
    $api.post<Response>(`/decision/like`, { id: decision._id }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Произошла ошибка", data.message, 15);
      newUser.likedDecisions.push(decision);
      setUser(newUser);
      setIsLiked(true);
    });
  };

  const dislike = () => {
    $api.post<Response>(`/decision/unlike`, { id: decision._id }).then(({ data }) => {
      if (data.type === "error") return alert("error", "Произошла ошибка", data.message, 15);
      newUser.likedDecisions.splice(user.likedDecisions.indexOf(decision), 1);
      setUser(newUser);
      setIsLiked(false);
    });
  };

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
            <AttachmentLink href={`${config.fileHost}/${decision.file}`} target="_blank">
              Прикрепленный файл
            </AttachmentLink>
          )}
        </DecisionAttachement>
      )}
      <UserInfo>
        <p>
          <Link to={`/profile/${decision.by && decision.by._id}`}>
            {decision.by && decision.by.name} {decision.by && decision.by.surname}
          </Link>
          • {new Date(decision.created).toLocaleString("ru")}
        </p>
        {user._id ? (
          isLiked ? (
            <LikeButton onClick={dislike}>
              <Icon path={mdiHeart} size={"16px"} />
            </LikeButton>
          ) : (
            <LikeButton onClick={like}>
              <Icon path={mdiHeartOutline} size={"16px"} />
            </LikeButton>
          )
        ) : (
          <></>
        )}
      </UserInfo>
      <Commentaries type="decision" postId={decision._id} comments={decision.comments} />
    </Container>
  );
});

export default DecisionBlock;
