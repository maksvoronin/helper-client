import { FC } from "react";
import { PageProps } from "../@types";
import { MainLayout } from "../@layouts";

const Index: FC<PageProps> = ({title}) => {
  return <MainLayout title={title}></MainLayout>;
};

export default Index;