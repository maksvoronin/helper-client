import { FC, PropsWithChildren } from "react";
import { PageProps } from "../@types";
import { observer } from "mobx-react";
import { styled } from "styled-components";
import { DevelopersHeader, DevelopersSidebar } from "../@widgets";

const Layout = styled.div`
  max-width: var(--developersWrapperWidth);
  margin: 0 auto;
  display: flex;
  margin-top: 10px;
  gap: 20px;
`;

const DevelopersLayout: FC<PropsWithChildren<PageProps>> = observer(({ title, children }) => {
  return (
    <>
      <title>{title}</title>
      <DevelopersHeader />
      <Layout>
        <DevelopersSidebar />
        {children}
      </Layout>
    </>
  );
});

export default DevelopersLayout;
