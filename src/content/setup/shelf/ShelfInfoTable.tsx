import { FC, ChangeEvent, useState, } from "react";
import { format } from "date-fns";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Container,
  Grid,
  CardActions,
  Button,
} from "@mui/material";

import Label from "@/components/Label";
import { ShelfInfo, ShelfInfoStatus } from "@/model/setup/shelfinfo";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import BulkActions from "./BulkActions";
import * as React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from 'next/router';
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

interface SetupShelfInfoTableProps {
  className?: string;
  cryptoOrders: ShelfInfo[];
}

interface Filters {
  status?: ShelfInfoStatus;
}

const applyFilters = (
  cryptoOrders: ShelfInfo[],
  filters: Filters
): ShelfInfo[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    // if (filters.status && cryptoOrder.status !== filters.status) {
    //   matches = false;
    // }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: ShelfInfo[],
  page: number,
  limit: number
): ShelfInfo[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const SetupShelfInfoTable: FC<SetupShelfInfoTableProps> = ({cryptoOrders}) => {

  const columns: GridColDef[] = [
    { 
      field: 'floorName', 
      headerName: 'Floor', 
      width: 100 
    },
    {
      field: 'floorDescription',
      headerName: 'Floor Description',
      type: 'number',
      width: 200,
    },
    {
      field: 'floorDate',
      headerName: 'Floor Date',
      type: 'number',
      width: 110,
    },  
    {
      field: 'floorAction',
      headerName: 'Floor Action',
      type: 'number',
      width: 120,
    },  
  ];
  
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={3}
    >
      <Grid item>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/shelf.jpeg"
            title="Shelf"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Shelf Name: Shelf 01
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Mock up text description. Mock up text description. Mock up text description. 
            Mock up text description. Mock up text description. Mock up text description. 
            </Typography>
          </CardContent>
          <CardActions>
          <NextLink href="/setup/shelf/" passHref>

            <Button size="small">Back to Shelf</Button>
          </NextLink>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <Card>
        <div style={{ height: 400, width: 600 }}>
          <DataGrid
            rows={cryptoOrders}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
        </Card>
      </Grid>
    </Grid>
  );
};

SetupShelfInfoTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

SetupShelfInfoTable.defaultProps = {
  cryptoOrders: [],
};

export default SetupShelfInfoTable;
