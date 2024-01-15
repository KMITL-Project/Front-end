import Head from 'next/head';
import SidebarLayout from "@/layout/SidebarLayout";
import PageHeader from '@/content/dashboard/PageHeader';
import { ReactElement } from "react";
import WatchList from "@/content/dashboard/List";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Breadcrumb from "@/components/Breadcrumbs";
import { Container, Grid } from "@mui/material";
import SignIn from '@/content/autentication/SignIn';
// import SignIn from '@/components/Authen/SignIn';
function ApplicationsTransactions() {

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
          <SignIn />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ApplicationsTransactions;
