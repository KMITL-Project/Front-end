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

const label = { inputProps: { "aria-label": "Switch demo" } };

const category = [
  {
    value: "เหล็ก",
    label: "เหล็ก",
  },
  {
    value: "ไม้",
    label: "ไม้",
  },
  {
    value: "อลูมิเนีย",
    label: "อลูมิเนียม",
  },
];

const unit = [
  {
    value: "แผ่น",
    label: "แผ่น",
  },
  {
    value: "อัน",
    label: "อัน",
  },
  {
    value: "ชิ้น",
    label: "ชิ้น",
  },
  {
    value: "แท่ง",
    label: "แท่ง",
  },
];


function Forms() {
  const currentRoute = router.pathname;

  const [currency, setCurrency] = useState("EUR");

  const handleChange = (event: any) => {
    setCurrency(event.target.value);
  };

  const [value, setValue] = useState(30);

  const handleChange2 = (_event: any, newValue: any) => {
    setValue(newValue);
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
              <CardHeader title="Material Details" />
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
                      required
                      id="outlined-required"
                      label="Material Name"
                      defaultValue="เครื่องมืองานเหล็ก"
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Category"
                      defaultValue="เลือก Category"
                      helperText="กรุณาเลือก Category"
                    >
                      {category.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Unit"
                      defaultValue="เลือก Unit"
                      helperText="กรุณาเลือก Unit"
                    >
                      {unit.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Grid item>
                      <NextLink href="/setup/material/" passHref>
                        <Button
                          variant="contained"
                          sx={{ margin: 1 }}
                          className={
                            currentRoute === "/setup/material/" ? "active" : ""
                          }
                          disableRipple
                          component="a"
                        >
                          Save{" "}
                        </Button>
                      </NextLink>
                      <NextLink href="/setup/material/" passHref>
                        <Button
                          variant="contained"
                          sx={{ margin: 1 }}
                          color="error"
                          className={
                            currentRoute === "/setup/material/" ? "active" : ""
                          }
                          disableRipple
                          component="a"
                        >
                          Cancel{" "}
                        </Button>
                      </NextLink>
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
