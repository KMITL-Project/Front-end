import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import PageTitle from "@/components/PageTitle";
import { ReactElement, useState } from "react";

import PageTitleWrapper from "@/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import Footer from "@/components/Footer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

import Switch from "@mui/material/Switch";
import NextLink from "next/link";
import router from "next/router";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { useRouter } from 'next/router';

const label = { inputProps: { "aria-label": "Switch demo" } };

const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "InActive",
    label: "InActive",
  },
];

const permission = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "Super Admin",
    label: "Super Admin",
  },
  {
    value: "User",
    label: "User",
  },
  {
    value: "Guest",
    label: "Guest",
  },
];

function Forms() {
  const router = useRouter();
  // const currentRoute = router.pathname;

  const [currency, setCurrency] = useState("EUR");

  const handleChange = (event: any) => {
    setCurrency(event.target.value);
  };

  const [value, setValue] = useState(30);

  const handleChange2 = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState([]);

  const handleStatusChange = (_event: any, newValue: any) => {
    setSelectedStatus(newValue);
  };

  const handlePermissionChange = (_event: any, newValue: any) => {
    setSelectedPermission(newValue);
  };

  return (
    <>
      <Head>
        <title></title>
      </Head>

      <Container maxWidth="lg">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item xs={10} direction="column" justifyContent="center">
            <Card>
              <CardHeader title="User Permission Details" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 1, width: "60ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="User Name"
                      defaultValue="วินัย"
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Status"
                      defaultValue="เลือก Status"
                      helperText="กรุณาเลือก Status"
                    >
                      {status.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Autocomplete
                      multiple
                      id="permission-select"
                      options={permission}
                      getOptionLabel={(option) => option.label}
                      defaultValue={[]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          helperText="กรุณาเลือก Permission"
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={option.value}
                            label={option.label}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                    />

                    <Grid item>
                      {/* <NextLink href="/setup/permission/" passHref> */}
                        <Button
                          variant="contained"
                          sx={{ margin: 1 }}
                          // className={
                          //   currentRoute === "/setup/permission/" ? "active" : ""
                          // }
                          onClick={() => router.push('/setup/permission/')}
                          disableRipple
                          component="a"
                        >
                          Save{" "}
                        </Button>
                      {/* </NextLink> */}
                      {/* <NextLink href="/setup/permission/" passHref> */}
                        <Button
                          variant="contained"
                          sx={{ margin: 1 }}
                          color="error"
                          // className={
                          //   currentRoute === "/setup/permission/" ? "active" : ""
                          // }
                          onClick={() => router.push('/setup/permission/')}
                          disableRipple
                          component="a"
                        >
                          Cancel{" "}
                        </Button>
                      {/* </NextLink> */}
                    </Grid>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

Forms.getLayout = (page: ReactElement) => <SidebarLayout>{page}</SidebarLayout>;

export default Forms;
