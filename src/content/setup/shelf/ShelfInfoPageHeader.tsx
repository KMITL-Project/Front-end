import { Typography, Button, Grid } from "@mui/material";

import { useRouter } from "next/router";


function PageHeader() {
  // fix bug router use useRouter()  import { useRouter } from "next/router";
  const router = useRouter()

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Shelf Info
        </Typography>
      </Grid>


      <Grid item>
        <Button
            variant="contained" sx={{ margin:1}}
            disableRipple
            component="a"
            onClick={() => {
              router.push('/setup/shelf/info/AddFloor/'); // ใส่ path ที่ต้องการทำการ redirect ไปที่นั้น
            }}
          >
            + Create Floor{" "}
          </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;