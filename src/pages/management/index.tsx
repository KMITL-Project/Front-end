import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement } from "react";
import WatchList from "@/content/dashboard/List";
import Link from "@/components/Link";
import BulkActions from "@/content/Management/Transactions/BulkActions";
import PageHeader from "@/content/Management/Transactions/PageHeader";






const Index = () => {
  return <><>
    <BulkActions></BulkActions>  </><></><PageHeader></PageHeader></>
    



};

Index.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;

};


export default Index;
