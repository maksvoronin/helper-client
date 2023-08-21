import { FC } from "react";
import { Application } from "../@types";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import { Link } from "../@shared";
import { baseURIs } from "../config";

const Container = styled(Link)`
  border-radius: 8px;
  color: var(--primaryText);
  display: block;
  border: 1px solid #dfdfdf;
  padding: 12px;
  cursor: pointer;
  box-shadow: transparent 0px 0px 0px;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: #a5a5a537 0px 5px 12px;
    text-decoration: none;
  }
`;

const AppTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  padding: 0;
  margin-bottom: 5px;
`;

const AppState = styled.p`
  font-size: 14px;
  margin: 0;
  padding: 0;
  font-weight: 500;
`;

const Enabled = styled(AppState)`
  color: #008000;
`;

const Disabled = styled(AppState)`
  color: #ff4747;
`;

const UserData = styled.p`
  margin: 0;
  padding: 0;
  margin-top: 5px;
`;

const AppsCard: FC<{ app: Application }> = observer(({ app }) => {
  return (
    <Container to={`${baseURIs.developers}/apps/${app._id}`}>
      <AppTitle>{app.name}</AppTitle>
      {app.status ? <Enabled>Работает</Enabled> : <Disabled>Не работает</Disabled>}
      <UserData>{app.owner.name} {app.owner.surname}</UserData>
    </Container>
  );
});

export default AppsCard;
