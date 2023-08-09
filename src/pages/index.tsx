import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement } from "react";

const Index = () => {
  return <div>test</div>;
};

Index.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Index;
