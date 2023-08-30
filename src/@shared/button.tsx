import { styled } from "styled-components";

const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 8px;
  background: var(--accentButtonBackground);
  border: none;
  color: var(--accentButtonForeground);
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s;
  &:active {
    transform: scale(0.995);
  }
`;

export default Button;