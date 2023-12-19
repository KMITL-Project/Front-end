import React from 'react';
import { Typography, Button, Grid } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import NextLink from 'next/link';

function PageHeader({ pageHeaderTitle }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {pageHeaderTitle}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
