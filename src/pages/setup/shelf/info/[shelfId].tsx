import Head from 'next/head';
import SidebarLayout from '@/layout/SidebarLayout';
import PageHeader from '@/content/setup/shelf/Info/ShelfInfoPageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import { ReactElement } from 'react';
import InfoShelf from '@/content/setup/shelf/Info/ShelfInfo'
import MaterialInfoPage from '@/content/management/material/info/MaterialInfo';
import Breadcrumb from '@/components/Breadcrumbs';


function ApplicationsTransactions() {
  const pageData: string = 'Home/Shelf/Shelf Info'; // ระบุเส้นทางของหน้าปัจจุบัน

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
            <InfoShelf/>
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



