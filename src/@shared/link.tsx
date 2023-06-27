import { Link as Old } from "react-router-dom";
import { styled } from "styled-components";

const Link = styled(Old)`
  color: var(--accentColor);
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

export default Link;