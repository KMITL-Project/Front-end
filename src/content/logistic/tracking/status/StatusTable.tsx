import { FC, ChangeEvent, useState } from "react";
import { format } from "date-fns";
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
  TextField,
  Button,
  styled,
} from "@mui/material";

import Label from "@/components/Label";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import NextLink from "next/link";
import { useRouter } from "next/router";
import BulkActions from "./BulkActions";
import Modal from "@mui/material/Modal";
import { Tracking, TrackingStatus } from "@/model/logistic/tracking";
import { Order } from "@/model/logistic/order";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: Tracking[];
}

interface Filters {
  status?: TrackingStatus;
}

const getStatusLabel = (listOrderStatus: TrackingStatus): JSX.Element => {
  const map = {
    failed: {
      text: "Failed",
      color: "error",
    },
    completed: {
      text: "Completed",
      color: "success",
    },
    pending: {
      text: "Pending",
      color: "warning",
    },
  };

  const { text, color }: any = map[listOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: Tracking[],
  filters: Filters
): Tracking[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: Tracking[],
  page: number,
  limit: number
): Tracking[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  // fuction for modal

  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("pdf");

  const handleExportClick = () => {
    // ตรวจสอบว่ามีรายการที่ถูกเลือกหรือไม่
    if (selectedReports.length === 0) {
      // แสดง popup แจ้งเตือนเมื่อไม่มีรายการที่ถูกเลือก
      alert("Please select items to export.");
      return;
    }
    // เปิด popup สำหรับการ Export
    setShowExportModal(true);
  };

  const handleCloseModal = () => {
    // ปิด popup สำหรับการ Export
    setShowExportModal(false);
  };

  const router = useRouter();
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "completed",
      name: "Completed",
    },
    {
      id: "pending",
      name: "Pending",
    },
    {
      id: "failed",
      name: "Failed",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId,
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  //stepper const
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = ["Step 1", "Step 2", "Step 3"]; // Add your own step names
  const TransparentStepper = styled(Stepper)({
    background: "transparent", // Set the background to transparent
  });
  
  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions
            Tracks={paginatedCryptoOrders.filter((value) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                value.id
              );
              return isCryptoOrderSelected;
            })}
          />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || "all"}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                  onClose={() => {
                    // Handle the dropdown close event
                    // เปิด Modal สำหรับการสรุปรายการ (Summary List Modal) เมื่อคลิก "Add"
                    setShowExportModal(false);
                  }}
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Tracking Status"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell align="center"  sx={{ width: '480px' }}>Details</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, cryptoOrder.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.orderID}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TransparentStepper activeStep={activeStep} alternativeLabel>
                      {steps.map((label, index) => (
                        <Step key={index}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </TransparentStepper>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(cryptoOrder.shippingDate, "MMMM dd yyyy")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(cryptoOrder.status)}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Order" arrow>
                      {/* <NextLink href="/logistic/customerList/AddCustomerList" passHref> */}
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.info.lighter,
                          },
                          color: theme.palette.info.main,
                        }}
                        onClick={() =>
                          router.push("/logistic/tracking/map/")
                        }
                        color="inherit"
                        size="small"
                      >
                        <VisibilityTwoToneIcon fontSize="small" />
                      </IconButton>
                      {/* </NextLink> */}
                    </Tooltip>
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        onClick={() =>
                          router.push("/logistic/customerList/EditCustomerList")
                        }
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>      
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: [],
};

export default RecentOrdersTable;
