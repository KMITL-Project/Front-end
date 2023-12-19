import Head from 'next/head';
import SidebarLayout from '@/layout/SidebarLayout';
import PageHeader from '@/content/Management/pickUp/PageHeader';
import Breadcrumb from '@/components/Breadcrumbs';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentOrders from '@/content/Management/material/MaretialView';
import { ReactElement } from 'react';
import Forms from '@/content/setup/category/AddCategory';
import Pickup from '@/content/Management/pickUp/pickup'
import PickupComponent from '@/content/Management/pickUp/PickupComponent';

function ApplicationsTransactions() {

  const pageData: string = 'Home/Pickup'; // ระบุเส้นทางของหน้าปัจจุบัน

  return (
    <>
      <Head>
        <title>Pickup</title>
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
            <Pickup />
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