import { FC } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";
import { SearchPagePanel } from "../@components";

const Search: FC<PageProps> = ({ title }) => {
  return (
    <MainLayout title={title}>
      <SearchPagePanel />
    </MainLayout>
  );
};

export default Search;
