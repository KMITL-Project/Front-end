import { Typography, Button, Grid } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import NextLink from 'next/link';
import { useRouter } from "next/router";


function PageHeader() {
  // fix bug router use useRouter()  import { useRouter } from "next/router";
  const router = useRouter()
  const currentRoute = router.pathname;
  const user = {
    name: "Catherine Pike",
    avatar: "/static/images/avatars/1.jpg",
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Shelf Info
        </Typography>
        {/* <Typography variant="subtitle2">
          {user.name}, these are your recent transactions
        </Typography> */}
      </Grid>


      <Grid item>
        <NextLink href="/setup/shelf/info/AddFloor" passHref>
        <Button
            variant="contained" sx={{ margin:1}}
            className={currentRoute === "/setup/shelf/info/AddFloor/" ? "active" : ""}
            disableRipple
            component="a"
            // onClick={closeSidebar}
            // startIcon={<TableChartTwoToneIcon />}
          >
            + Create Floor{" "}
          </Button>
        </NextLink>
      </Grid>
    </Grid>
  );
}

export default PageHeader;