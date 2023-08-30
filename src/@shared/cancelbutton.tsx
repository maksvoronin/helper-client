import { styled } from "styled-components";
import Button from "./button";

const CancelButton = styled(Button)`
  background: var(--cancelButtonBackground);
  color: var(--primaryText);
  font-weight: 500;
  transition: background 0.2s, transform 0.2s;

  &:hover {
    background: var(--cancelButtonBackground__hover);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export default CancelButton;