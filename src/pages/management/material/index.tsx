import React from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layout/SidebarLayout';
import PageHeader from '@/content/management/material/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import MaterialOrders from '@/content/management/material/MaretialPage';
import { ReactElement } from 'react';
import Breadcrumb from '@/components/Breadcrumbs';


function ApplicationsTransactions() {
  const pageData: string = 'Home/Material'; // ระบุเส้นทางของหน้าปัจจุบัน

  return (
    <>
      <Head>
        <title>Material</title>
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
            <MaterialOrders />
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