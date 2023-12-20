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
  styled,
  Avatar,
  IconButton,
  Link,
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
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import { Upload } from "@mui/icons-material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Paper from "@mui/material/Paper";

const label = { inputProps: { "aria-label": "Switch demo" } };

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(7)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(25)};
      height: ${theme.spacing(25)};
    }
`
);
const Input = styled("input")({
  display: "none",
});
const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Forms() {
  const currentRoute = router.pathname;

  const [currency, setCurrency] = useState("EUR");

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [value, setValue] = useState(30);

  const handleChange2 = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title></title>
      </Head>
        <Card>
          <CardContent>
              <Grid container spacing={3} justifyContent="center">
                {/* Column 1 - Label */}
                {/* <Grid item xs={12} sm={1.5}>
            
                </Grid> */}

                {/* Column 2 - Form */}
                <Grid item xs={12} sm={6}>
                  <TextField
                      required
                      fullWidth
                      className="mb-4" 
                      id="outlined-required"
                      label="Shelf Name"
                      defaultValue="ชั้นเครื่องมือ"
                      />
                  <TextField
                      required
                      fullWidth
                      className="mb-4" 
                      id="outlined-required"
                      label="Shlef Description"
                      defaultValue="ประแจ"
                    />
                </Grid>

                {/* Column 3 - Upload */}
                <Grid item xs={12} sm={4} container justifyContent="center" alignItems="center" className="ml-5">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-violet-600">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </Grid>
              </Grid>

              {/* Button Row */}
              <Grid container justifyContent="flex-end">
                  <Grid item>
                    <NextLink href="/setup/shelf/" passHref>
                          <Button variant="contained" sx={{ margin:1}}
                              disableRipple
                              component="a"
                          >
                              Cancel
                          </Button>
                    </NextLink>
                  </Grid>
                  <Grid item>
                    <NextLink href="/setup/shelf/" passHref>
                          <Button variant="contained" sx={{ margin:1}}
                              disableRipple
                              color="error"
                                  component="a"
                          >
                              Save
                          </Button>
                      </NextLink>
                  </Grid>
              </Grid>
          </CardContent>
        </Card>
    </>
  );
}

Forms.getLayout = (page: ReactElement) => <SidebarLayout>{page}</SidebarLayout>;

export default Forms;
