import { styled } from "styled-components";

const AppsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 20px;
  @media (max-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 1040px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export default AppsContainer;
