import Head from 'next/head';
import SidebarLayout from '@/layout/SidebarLayout';
import PageHeader from '@/content/setup/unit/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentOrders from '@/content/setup/unit/UnitView';
import { ReactElement } from 'react';
import Breadcrumb from '@/components/Breadcrumbs';

function ApplicationsTransactions() {
  const pageData: string = 'Home/Unit'; // ระบุเส้นทางของหน้าปัจจุบัน

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



