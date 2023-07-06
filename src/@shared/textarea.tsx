import { styled } from "styled-components";

const Textarea = styled.textarea`
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #c7c7c7;
  border-radius: 8px;
  min-height: 70px;
  font-size: 13px;
  resize: vertical;
`;

export default Textarea;
