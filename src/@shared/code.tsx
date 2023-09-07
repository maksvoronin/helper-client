import { styled } from "styled-components";

const Code = styled.code`
  padding: 12px 18px;
  display: block;
  border-radius: 8px;
  border: var(--developersCodeBorder);
  background: var(--developersCodeBackground);
  font-size: 14px;
  font-family: "Ubuntu Mono", monospace;
  margin-top: 16px;
  overflow: auto;
  color: var(--primaryText);
`;

export default Code;
