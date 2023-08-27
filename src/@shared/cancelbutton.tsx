import { styled } from "styled-components";
import Button from "./button";

const CancelButton = styled(Button)`
  background: #eef3f7;
  color: var(--primaryText);
  font-weight: 500;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: #e2e7eb;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default CancelButton;