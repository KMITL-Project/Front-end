import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement } from "react";
import WatchList from "@/content/dashboard/List";
import Link from "@/components/Link";
import BulkActions from "@/content/Management/Transactions/BulkActions";
import PageHeader from "@/content/Management/Transactions/PageHeader";
import RecentOrders from "@/content/Management/Transactions/RecentOrders";






const Index = () => {
  return <>
  <WatchList></WatchList></>



};

Index.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;

};


export default Index;



