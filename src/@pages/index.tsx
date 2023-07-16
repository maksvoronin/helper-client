import { FC } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { SearchDecisions } from "../@widgets";
import { observer } from "mobx-react";

const Index: FC<PageProps> = observer(({title}) => {
  return <MainLayout title={title}>
    <SearchDecisions />
  </MainLayout>;
});

export default Index;