import { FC } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { SearchDecisions } from "../@widgets";

const Index: FC<PageProps> = ({title}) => {
  return <MainLayout title={title}>
    <SearchDecisions />
  </MainLayout>;
};

export default Index;