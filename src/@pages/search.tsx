import { FC } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { SearchPagePanel } from "../@components";
import { observer } from "mobx-react";

const Search: FC<PageProps> = observer(({ title }) => {
  return (
    <MainLayout title={title}>
      <SearchPagePanel />
    </MainLayout>
  );
});

export default Search;
