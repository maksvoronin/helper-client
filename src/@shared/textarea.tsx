import { styled } from "styled-components";

const Textarea = styled.textarea`
  width: calc(100% - 20px);
  padding: 10px;
  border: var(--primaryBorder);
  border-radius: 8px;
  min-height: 70px;
  font-size: 13px;
  resize: vertical;
  background: var(--accentBackground);
`;

export default Textarea;
