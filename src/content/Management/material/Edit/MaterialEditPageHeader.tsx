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
          Material Edit
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;