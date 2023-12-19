import React from 'react';
import Link from 'next/link';
import { Breadcrumbs as MUIBreadcrumbs, Typography, Grid } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

function Breadcrumbs({ breadcrumbs }) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Link href="/">
          <HomeIcon />
        </Link>
      </Grid>
      <Grid item>
        <MUIBreadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => (
            <Link key={index} href={breadcrumb.url}>
              {breadcrumb.text}
            </Link>
          ))}
        </MUIBreadcrumbs>
      </Grid>
    </Grid>
  );
}

export default Breadcrumbs;
