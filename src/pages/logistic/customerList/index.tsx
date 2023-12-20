import Head from 'next/head';
import SidebarLayout from '@/layout/SidebarLayout';
import PageHeader from '@/content/logistic/customerList/CustomerListPageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import RecentOrders from '@/content/logistic/customerList/CustomerListView';

function ApplicationsTransactions() {
  return (
    <>
      {/* <Head>
        <title>Transactions - Applications</title>
      </Head> */}
      <PageTitleWrapper>
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
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
