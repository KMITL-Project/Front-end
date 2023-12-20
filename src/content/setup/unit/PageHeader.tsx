import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import router from "next/router";
import NextLink from 'next/link';
import { useRouter } from 'next/router';

function PageHeader() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Unit of Product
        </Typography>
      </Grid>


      <Grid item>
        {/* <NextLink href="/setup/unit/AddUnit/" passHref> */}
        <Button
            variant="contained" sx={{ margin:1}}
            // className={currentRoute === "/setup/unit/AddUnit/" ? "active" : ""}
            onClick={() => {
              router.push('/setup/unit/AddUnit/'); // ใส่ path ที่ต้องการทำการ redirect ไปที่นั้น
            }}
            disableRipple
            component="a"
            // onClick={closeSidebar}
            // startIcon={<TableChartTwoToneIcon />}
          >
            + Create Unit{" "}
          </Button>
        {/* </NextLink> */}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
