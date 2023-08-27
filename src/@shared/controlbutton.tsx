import { styled } from "styled-components";

const ControlButton = styled.button`
  height: 40px;
  border: none;
  background: transparent;
  width: 100%;
  border-radius: 8px;
  font-size: 14px;
  transition: background 0.2s, transform 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 10px;
  &:hover {
    background-color: rgba(100, 100, 100, 0.1);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export default ControlButton;
