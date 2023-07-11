import { styled } from "styled-components";

const Container = styled.div`
  width: calc(100% - 40px);
  padding: 20px;
  background-color: var(--containerBackground);
  backdrop-filter: blur(70px);
  border-radius: 12px;
`;

export default Container;