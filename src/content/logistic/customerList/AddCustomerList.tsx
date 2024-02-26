import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import PageTitle from "@/components/PageTitle";
import { ReactElement, useEffect, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

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
import { useRouter } from "next/router";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
// Change the import statement to the correct path

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import * as L from "leaflet";
import "leaflet-defaulticon-compatibility";

const label = { inputProps: { "aria-label": "Switch demo" } };

const customIcon = new L.Icon({
  iconUrl: "/location.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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
const handleSearch = () => {
  // Handle the search action here
  // You can use a geocoding API to get the coordinates for the searched place
};

type LatLngTuple = [number, number];

const Search = ({ setMarkerPosition, setCurrentPosition }: any) => {
  const map = useMap();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: searchTerm });
    if (results.length > 0) {
      const { x, y } = results[0];
      map.setView([y, x], 13);
      setMarkerPosition([y, x]);
      setCurrentPosition([y, x]);
    }
  };

  return (
    <div
      style={{ position: "absolute", top: "10px", right: "0px", zIndex: 1000}}

    >
      <input
        style={{
        border: "1px solid #ccc", // Border color
        borderColor: "#ccc", // Border color
        borderWidth: "2px", // Border width
        borderRadius:"4px",
        padding:"5px",alignContent:"center", position: "absolute", top: "0px", right: "70px", zIndex: 1000, width:"146px", height:"30px"}}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a location"
      />
      <button 
      style={{
        border: "1px solid #ccc", // Border color
        borderColor: "#ccc", // Border color
        borderWidth: "2px", // Border width
        borderRadius:"4px",
      alignContent:"center", position: "absolute", top: "0px", right: "12px", zIndex: 1000, width:"50px", height:"30px", backgroundColor:"white"}}
      onClick={handleSearch}>Search</button>
    </div>
  );
};

function Forms() {
  const initialPosition: LatLngTuple = [51.505, -0.09];
  const [currentPosition, setCurrentPosition] = useState<LatLngTuple | null>(
    null
  );
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(
    null
  );

  const router = useRouter();
  // const currentRoute = router.pathname;

  useEffect(() => {
    // Fetch current location using the browser's geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition([latitude, longitude]);
        setMarkerPosition([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }, []);

  const [value, setValue] = useState(30);

  const handleChange2 = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleMarkerDrag = (event: L.LeafletEvent) => {
    const marker = event.target;
    const newPosition = marker.getLatLng();
    setMarkerPosition([newPosition.lat, newPosition.lng]);
    updateTextFieldValue(newPosition);
  };

  const updateTextFieldValue = (newPosition: L.LatLng) => {
    const latitude = newPosition.lat.toFixed(6);
    const longitude = newPosition.lng.toFixed(6);
    setTextFieldValue({ latitude, longitude });
  };

  const [textFieldValue, setTextFieldValue] = useState<{
    latitude: string;
    longitude: string;
  }>({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (currentPosition) {
      const latitude = currentPosition[0].toFixed(6);
      const longitude = currentPosition[1].toFixed(6);
      setTextFieldValue({ latitude, longitude });
    }
  }, [currentPosition]);

  return (
    <>
      <Head>
        <title></title>
      </Head>

      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <Grid item xs={12} direction="column" justifyContent="center">
            <Card>
              <CardHeader title="Order Details" />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  {/* Left Column */}
                  <Grid item xs={12} sm={6}>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "100%" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        required
                        id="outlined-required"
                        label="Customer Name"
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Details"
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Address"
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Latitude"
                        value={textFieldValue.latitude}
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField
                        required
                        id="outlined-required"
                        label="Longitude"
                        value={textFieldValue.longitude}
                        InputProps={{
                          readOnly: true,
                        }}
                      />

                      <TextField required id="outlined-required" label="Date" />
                    </Box>
                    <Grid container justifyContent="center" paddingTop={2}>
                      <Button
                        variant="contained"
                        sx={{ margin: 1 }}
                        onClick={() => router.push("/logistic/customerList/")}
                        disableRipple
                        component="a"
                      >
                        Save
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ margin: 1 }}
                        color="error"
                        onClick={() => router.push("/logistic/customerList/")}
                        disableRipple
                        component="a"
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>

                  {/* Right Column */}
                  <Grid item xs={12} sm={6}>
                    {/* Leaflet Map */}
                    <div>
                      {currentPosition ? (
                        <MapContainer
                          center={currentPosition}
                          zoom={13}
                          style={{ height: "400px", width: "100%" }}
                          scrollWheelZoom={false}
                        >
                          <Search
                            setMarkerPosition={setMarkerPosition}
                            setCurrentPosition={setCurrentPosition}
                          />
                          <TileLayer
                            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker
                            position={markerPosition || [0, 0]}
                            draggable={true}
                            eventHandlers={{ dragend: handleMarkerDrag }}
                            icon={customIcon} // Use the custom icon
                          >
                            <Popup>
                              A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                            <Tooltip>{`Latitude: ${markerPosition?.[0]}, Longitude: ${markerPosition?.[1]}`}</Tooltip>
                          </Marker>
                        </MapContainer>
                      ) : (
                        <p>Loading map...</p>
                      )}
                    </div>
                  </Grid>
                </Grid>
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
