import { FC } from "react";
import { FormStatus } from "../@types";
import { observer } from "mobx-react";
import { styled } from "styled-components";

const Text = styled.p`
  margin: 0;
  margin-top: 5px;
  font-weight: 500;
  text-align: center;
  font-size: 14px;
`;
const SuccessText = styled(Text)`
  color: rgb(48, 158, 48);
`;

const ErrorText = styled(Text)`
  color: red;
`;

const ResultField: FC<FormStatus> = observer(({ status, message }) => {
  if (!message) return <></>;
  if (!status) return <ErrorText>{message}</ErrorText>;
  return <SuccessText>{message}</SuccessText>;
});

export default ResultField;
