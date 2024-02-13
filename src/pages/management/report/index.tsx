import React from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layout/SidebarLayout';
import PageHeader from '@/content/management/report/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import ReportOrders from '@/content/management/report/ReportView';
import RecentOrdersTable from '@/content/management/report/ReportTable';
import { ReactElement } from 'react';
import Breadcrumb from '@/components/Breadcrumbs';


function ApplicationsTransactions() {
  const pageData: string = 'Home/Report'; // ระบุเส้นทางของหน้าปัจจุบัน

  return (
    <>
      <Head>
        <title>Report</title>
      </Head>
      <PageTitleWrapper>
        {/* เรียกใช้ Breadcrumb component และส่งค่า pageData */}
        <Breadcrumb pageData={pageData} />
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrdersTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

ApplicationsTransactions.getLayout = (page: ReactElement) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;