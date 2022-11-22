import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageDefault.interface";

const IndexPage = ({ title }: DefaultPage) => {
  return (
    <MainLayout title={title}>
      test
    </MainLayout>
  );
}

export default IndexPage;