import Head from 'next/head';
import SidebarLayout from '@/layout/SidebarLayout';
import PageHeader from '@/content/setup/material/Edit/TypeEditPageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import { ReactElement } from 'react';
import MaterialEditPage from '@/content/setup/material/Edit/TypeEdit';
import Breadcrumb from '@/components/Breadcrumbs';

function ApplicationsTransactions() {
  const pageData: string = 'Home/Material/Material Edit'; // ระบุเส้นทางของหน้าปัจจุบัน

  return (
    <>
      <Head>
        <title></title>
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
            <MaterialEditPage/>
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


