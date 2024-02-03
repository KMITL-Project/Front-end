import Head from 'next/head';
import SidebarLayout from '@/layout/SidebarLayout';
import PageHeader from '@/content/logistic/order/OrderPageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentOrders from '@/content/logistic/order/OrderView';

import { ReactElement } from 'react';
import Breadcrumb from '@/components/Breadcrumbs';

function ApplicationsTransactions() {
  const pageData: string = 'Home/ใบสั่ง'; // ระบุเส้นทางของหน้าปัจจุบัน

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <PageTitleWrapper>
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
            <RecentOrders />
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



