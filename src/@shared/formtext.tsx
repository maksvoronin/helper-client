import { styled } from "styled-components";

const FormText = styled.p`
  margin-bottom: 5px;
  color: var(--primaryText);
  a {
    font-size: 16px;
  }

  code {
    font-family: "Ubuntu Mono", monospace;
    background: var(--developersTextCodeBackground);
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 16px;
  }
`;

export default FormText;