import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import router from "next/router";
<<<<<<< HEAD
import NextLink from "next/link";
import { useRouter } from "next/router";
=======
import NextLink from 'next/link';
import { useRouter } from 'next/router';
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b

function PageHeader() {
  const router = useRouter();
  // const currentRoute = router.pathname;
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          ติดตามการขนส่ง
        </Typography>
        {/* <Typography variant="subtitle2">
          {user.name}, these are your recent transactions
        </Typography> */}
      </Grid>

<<<<<<< HEAD
=======

>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b
      <Grid item>
        {/* <NextLink href="/logistic/customerList/AddCustomerList/" passHref> */}
        {/* <Button
            variant="contained" sx={{ margin:1}}
            // className={currentRoute === "/logistic/customerList/AddCustomerList/" ? "active" : ""}
            disableRipple
            component="a"
            onClick={() => router.push('/logistic/customerList/AddCustomerList/')}
            // onClick={closeSidebar}
            // startIcon={<TableChartTwoToneIcon />}
          >
            + Add{" "}
          </Button> */}
        {/* </NextLink> */}
      </Grid>
    </Grid>
  );
}

<<<<<<< HEAD
export default PageHeader;
=======
export default PageHeader;
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b
