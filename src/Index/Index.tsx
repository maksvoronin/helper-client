import MainLayout from "../@layouts/main.layout";
import { DefaultPage } from "../@types/pageDefault.interface";

const IndexPage = ({ title }: DefaultPage) => {
  return (
    <MainLayout title={title}>
      
    </MainLayout>
  );
}

export default IndexPage;