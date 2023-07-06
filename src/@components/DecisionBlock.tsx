import { observer } from "mobx-react";
import { FC } from "react";
import { Container } from "../@shared";
import { Decision } from "../@types";
import { styled } from "styled-components";

const DecisionText = styled.p`
  margin: 0;
  padding: 0;
`;

const UserInfo = styled.div`

`;

const DecisionBlock: FC<{decision: Decision}> = observer(({decision}) => {
  return <Container>
    <DecisionText>{decision.content}</DecisionText>
    <UserInfo></UserInfo>
  </Container>
});

export default DecisionBlock;