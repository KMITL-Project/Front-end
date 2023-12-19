// Breadcrumb.tsx

import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NextLink from 'next/link';


interface BreadcrumbProps {
  pageData: string;
}

const generateBreadcrumbs = (pageData: string) => {
  const breadcrumbItems = pageData.split('/');

  const breadcrumbs = [];

  for (let i = 0; i < breadcrumbItems.length; i++) {
    const path = breadcrumbItems.slice(0, i + 1).join('/');
    breadcrumbs.push(
      <NextLink key={path} color="inherit" href={`/${path}`}>
        {breadcrumbItems[i]}
      </NextLink>
    );
  }

  return breadcrumbs;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageData }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {generateBreadcrumbs(pageData)}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
