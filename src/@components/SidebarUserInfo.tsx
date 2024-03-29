import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { useAuthStoreContext, useStatStoreContext } from "../@store";
import $api from "../@http";
import { Response, Stat } from "../@types";
import { styled } from "styled-components";
import config, { baseURIs } from "../config";
import { Link } from "react-router-dom";
import { mdiCogOutline } from "@mdi/js";
import Icon from "@mdi/react";

const UserContainer = styled.div`
  padding-left: 14px;
  border-radius: 12px;
  background-color: var(--pageBackground);
  margin-top: auto;
  bottom: 40px;
  width: calc(100% - 14px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  border: var(--primaryBorder);

  @media(max-height: 600px) {
    margin-top: 30px;
  }
`;

const UserContent = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  background-color: #c7c7c7;
  width: 42px;
  height: 42px;
  border-radius: 50px;
  background-position: 0px 80%;
  background-size: 100%;
`;

const UserTexts = styled.div`
  margin-left: 10px;
`;

const UserLink = styled(Link)`
  font-size: 14px;
  display: block;
  padding-top: 14px;
  font-weight: bold;
  color: var(--primaryText);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const UserStat = styled.span`
  font-size: 12px;
  display: block;
  padding-bottom: 14px;
  color: var(--primaryText);
`;

const SettingsButton = styled(Link)`
  padding-left: 15px;
  border-left: var(--primaryBorder);
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 14px;
  border-radius: 0px 12px 12px 0px;
  cursor: pointer;
  color: var(--accentColor);
  min-height: 70px;
  &:hover {
    background: var(--hoverBackground);
  }
`;

const SidebarUserInfo: FC = observer(() => {
  const { user } = useAuthStoreContext();
  const { comments, decisions, setDecisions, setComments } = useStatStoreContext();

  const [commentsPage, setCommentsPage] = useState<number>(0);
  const [decisionsPage, setDecisionsPage] = useState<number>(0);

  useEffect(() => {
    if ((!comments || !decisions) && user._id) {
      $api.get<Response<Stat>>(`/stat/user?id=${user._id}&params=count`).then(({ data }) => {
        if(data.type === "error") return;
        setDecisionsPage(data.data!.countDecisions);
        setCommentsPage(data.data!.countComments);
        setDecisions(data.data!.countDecisions);
        setComments(data.data!.countComments);
      });
    } else {
      setCommentsPage(comments);
      setDecisionsPage(decisions);
    }
  }, [comments, decisions, user, setCommentsPage, setDecisionsPage, setDecisions, setComments]);

  return (
    <UserContainer>
      {user && (
        <>
          <UserContent>
            <UserAvatar style={{ backgroundImage: `url(${config.API}/public/${user.avatar})` }} />
            <UserTexts>
              <UserLink to={`${baseURIs.main}/profile/${user._id}`}>
                {user.name} {user.surname}
              </UserLink>
              <UserStat>
                {decisionsPage} реш. / {commentsPage} замеч.
              </UserStat>
            </UserTexts>
          </UserContent>
          <SettingsButton to={"/settings"}>
            <Icon path={mdiCogOutline} size={"24px"} />
          </SettingsButton>
        </>
      )}
    </UserContainer>
  );
});

export default SidebarUserInfo;
