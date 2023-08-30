import { styled } from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
  border-radius: 8px;
  border: var(--primaryBorder);
  height: 40px;
  background: var(--accentBackground);
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  color: var(--primaryText);
`;

export default StyledSelect;