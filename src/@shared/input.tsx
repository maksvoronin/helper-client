import { styled } from "styled-components";

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 0;
  border: var(--primaryBorder);
  min-height: 38px;
  max-height: 38px;
  border-radius: 8px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 13px;
  background: var(--accentBackground);
  color: var(--primaryText);
`;

export default Input;