import MainLayout from "@/layout/MainLayout";
import { ReactElement } from "react";

const Index = () => {
  return <div>test</div>;
};

Index.getLayout = (page: ReactElement) => {
  return (
    <MainLayout>
      {page}
    </MainLayout>
  );
};

export default Index;
