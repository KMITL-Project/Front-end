import Head from "next/head";
import SidebarLayout from "@/layout/SidebarLayout";
import { ReactElement, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Button,
  CardHeader,
  Divider,
  MenuItem,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

function AddPermission() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_id: "",
    role_id: "",
  });

  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [cryptoOrders, setCryptoOrders] = useState([]);

  useEffect(() => {
    const fetchFloorData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await fetch(
            `${publicRuntimeConfig.BackEnd}material`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseUser = await fetch(
            `${publicRuntimeConfig.BackEnd}users/user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseRole = await fetch(
            `${publicRuntimeConfig.BackEnd}role`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok && responseUser.ok && responseRole.ok) {
            const responseData = await response.json();
            const responseDataUser = await responseUser.json();
            const responseDataRole = await responseRole.json();
            // console.log('Floor Data:', responseDataFloor.data);
            setCryptoOrders(
              responseData.data.map((material: any) => ({
                value: material.id,
                label: material.name,
              }))
            );
            setUserData(
              responseDataUser.data.map((user: any) => ({
                value: user.id,
                label: user.username,
              }))
            );
            setRoleData(
              responseDataRole.data.map((role: any) => ({
                value: role.id,
                label: role.name,
              }))
            );
          } else if (
            response.status === 401 ||
            responseUser.status === 401 ||
            responseRole.status === 401
          ) {
            console.log("Token expired or invalid");
            localStorage.removeItem("accessToken");
          } else {
            console.error(
              "Failed to fetch floor or unit data. Response:",
              response,
              responseUser,
              responseRole
            );
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFloorData();
  }, []);

  const handleCreateUnit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formDataToSend = new FormData();
    formDataToSend.append("user_id", formData.user_id);
    formDataToSend.append("role_id", formData.role_id);

    try {
      if (token) {
        const response = await fetch(
          `${publicRuntimeConfig.BackEnd}role/add-role-user`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          }
        );
        console.log("formData:", formDataToSend);
        if (response.ok) {
          // console.log('name:', formDataToSend.get('name'));
          const responseData = await response.json();
          // ดำเนินการหลังจากการสร้าง Unit สำเร็จ
          console.log("Add Permission successfully!");
          router.push("/setup/permission");
        } else if (response.status === 401) {
          // Token หมดอายุหรือไม่ถูกต้อง
          console.log("Token expired or invalid");
          // ทำการลบ token ที่หมดอายุจาก localStorage
          localStorage.removeItem("accessToken");
        } else {
          // ถ้าการสร้าง Unit ไม่สำเร็จ
          console.error("Material creation failed");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event: any, id: any) => {
    const { value } = event.target;

    if (id === "user_id") {
      setFormData({
        ...formData,
        user_id: value,
      });
    } else if (id === "role_id") {
      setFormData({
        ...formData,
        role_id: value,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Card>
        <CardHeader title="Add Permission" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} className="mt-5">
              <TextField
                required
                fullWidth
                className="mb-4"
                id="user_id"
                label="User Name"
                value={formData.user_id}
                onChange={(e) => handleChange(e, "user_id")}
                select
              >
                {userData.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                fullWidth
                className="mb-4"
                id="role_id"
                label="Role"
                value={formData.role_id}
                onChange={(e) => handleChange(e, "role_id")}
                select
              >
                {roleData.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          {/* Button Row */}
          <form onSubmit={handleCreateUnit} encType="multipart/form-data">
            <Grid container justifyContent="flex-end" className="mt-5">
              <Button
                variant="contained"
                sx={{ margin: 1 }}
                disableRipple
                component="a"
                // type="submit"
                onClick={handleCreateUnit}
              >
                Create
              </Button>
              <Button
                variant="contained"
                sx={{ margin: 1 }}
                disableRipple
                color="error"
                component="a"
                onClick={() => router.push("/setup/permission")}
              >
                Cancel
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

AddPermission.getLayout = (page: ReactElement) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default AddPermission;
