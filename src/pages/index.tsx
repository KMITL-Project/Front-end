import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement } from "react";
import WatchList from "@/content/dashboard/List";
import Link from "@/components/Link";






const Index = () => {
  return <>
  <WatchList></WatchList></>

};

Index.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;

};


export default Index;
