import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement } from "react";
import WatchList from "@/content/dashboard/List";
import Link from "@/components/Link";
import BulkActions from "@/content/Management/Transactions/BulkActions";
import PageHeader from "@/content/Management/Transactions/PageHeader";
import RecentOrders from "@/content/Management/Transactions/RecentOrders";
import { Head } from "next/document";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Breadcrumb from "@/components/Breadcrumbs";
import { Container, Grid } from "@mui/material";

const Index = () => {
  const pageData: string = 'Home/Dashboard'; // ระบุเส้นทางของหน้าปัจจุบัน

  return (
    <>
      <WatchList></WatchList>
    </>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};

export default Index;
