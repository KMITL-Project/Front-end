import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement, useState, FC, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { useRouter } from "next/router";
import getConfig from "next/config";
import FloorTable from "@/content/setup/shelf/Floor/FloorTable";

const { publicRuntimeConfig } = getConfig();

interface EditUnitProps {}

const InfoShelf: FC<EditUnitProps> = () => {
  const router = useRouter();
  const { shelfId } = router.query;
  const [unitData, setUnitData] = useState<any>({
    id: "",
    name: "",
    detail: "",
    image_url: "",
    created_at: "",
  });
  const [image, setImage] = useState<Blob | undefined>(undefined);

  useEffect(() => {
    if (shelfId) {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          if (token) {
            const response = await fetch(
              `${publicRuntimeConfig.BackEnd}shelf/${shelfId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (response.ok) {
              const responseData = await response.json();
              console.log("ok", responseData);
              setUnitData(responseData.data);

              const responseImage = await fetch(
                `${publicRuntimeConfig.BackEnd}upload/${responseData.data.image_url}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (responseImage.ok) {
                const imageData = await responseImage.blob(); // หรือ responseImage.text() ตามที่เหมาะสม
                console.log("image", imageData);
                setImage(imageData);
              } else {
                console.error(
                  "Error fetching image:",
                  responseImage.statusText
                );
              }
            } else if (response.status === 401) {
              // Token หมดอายุหรือไม่ถูกต้อง
              console.log("Token expired or invalid");
              // ทำการลบ token ที่หมดอายุจาก localStorage
              localStorage.removeItem("accessToken");
            } else {
              console.error("Failed to fetch unit data");
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchData(); // เรียก fetchData เมื่อ Component ถูก Mount
    }
  }, [shelfId]);

  if (!shelfId) {
    return <div>Loading...</div>;
  }

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
              <CardHeader
                title="Shelf Info"
                action={
                  <Button
                    // type="submit"
                    variant="contained"
                    sx={{ margin: 1 }}
                    onClick={() =>
                      router.push(
                        `/setup/shelf/info/AddFloor?shelfId=${shelfId}`
                      )
                    }
                    disableRipple
                    component="a"
                  >
                    + Create Floor{" "}
                  </Button>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12} sm={4}>
                    {/* Display uploaded image */}
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      className="mt-5 mb-5 flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg bg-gray-50"
                    >
                      <img
                        src={image ? URL.createObjectURL(image) : ""}
                        alt="Uploaded Image"
                        className="max-h-48 max-w-full"
                      />
                    </Grid>
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Shelf Id"
                      variant="outlined"
                      value={unitData.id}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Shelf Name"
                      variant="outlined"
                      value={unitData.name}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Shelf Detail"
                      variant="outlined"
                      value={unitData.detail}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      required
                      fullWidth
                      className="mb-5"
                      label="Shelf created"
                      variant="outlined"
                      value={
                        unitData.created_at
                          ? format(new Date(unitData.created_at), "yyyy-MM-dd")
                          : ""
                      }
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  {/* Column 2 - Form */}
                  <Grid item xs={12} sm={7} className="mt-5">
                    <FloorTable />
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Button
                      // type="submit"
                      variant="contained"
                      sx={{ margin: 1 }}
                      onClick={() => router.push("/setup/shelf/")}
                      disableRipple
                      component="a"
                    >
                      Back{" "}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// EditUnit.getLayout = (page : ReactElement) => <SidebarLayout>{page}</SidebarLayout>;
export default InfoShelf;
