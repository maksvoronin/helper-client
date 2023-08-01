import { observer } from "mobx-react";
import { FC } from "react";
import { styled } from "styled-components";

const Sidebar = styled.div`
  max-width: 190px;
  width: 100%;
`;

const Paragraph = styled.p`
  font-weight: 500;
  margin: 0;
  font-size: 14px;
  color: #555;
`;

const DevelopersSidebar: FC = observer(() => {
  return <Sidebar>
    <Paragraph>Введение</Paragraph>
  </Sidebar>
});

export default DevelopersSidebar;