import { styled } from "styled-components";

const FileLabel = styled.label`
  width: 100%;
  text-align: center;
  display: block;
  border-radius: 12px;
  background: #e8f5ff00;
  color: white;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  color: var(--accentColor);

  &:hover {
    text-decoration: underline;
  }
`;

export default FileLabel;