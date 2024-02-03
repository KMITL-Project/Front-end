import { FC, ChangeEvent, useState } from "react";
import { format } from "date-fns";
import numeral from "numeral";
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
} from "@mui/material";

import Label from "@/components/Label";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import NextLink from "next/link";
import { useRouter } from "next/router";
import BulkActions from "./BulkActions";
import Modal from "@mui/material/Modal";
import { Order, OrderStatus } from "@/model/logistic/order";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { LatLngTuple } from "leaflet";

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: Order[];
}

interface Filters {
  status?: OrderStatus;
}

const getStatusLabel = (listOrderStatus: OrderStatus): JSX.Element => {
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

const applyFilters = (cryptoOrders: Order[], filters: Filters): Order[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: Order[],
  page: number,
  limit: number
): Order[] => {
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

  const handleExportConfirm = () => {
    // ถ้าเลือก Export เป็น Excel
    if (fileType === "excel") {
      // สร้างชุดข้อมูลสำหรับ Excel
      const dataForExcel = paginatedReports.map((report) => {
        return {
          "Material ID": report.orderDetails,
          "Material Name": report.orderID,
          Category: report.sourceName,
          Unit: report.unit,
          Shelf: report.shelf,
          Floor: report.floor,
        };
      });

      // สร้าง Workbook ของ Excel
      const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
      // Merge เซลล์ A1 ถึง F1 เพื่อใส่หัวข้อ
      worksheet["!merges"] = [
        // สร้างการ Merge ให้กับเซลล์ A1 ถึง F1
        { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }, // A1:F1
      ];

      // กำหนดข้อความลงในเซลล์ A1 ให้เป็น "Material List"
      const headerStyle = {
        font: { bold: true },
        alignment: { horizontal: "center" },
      };

      worksheet["A1"].s = headerStyle;
      worksheet["A1"].v = "Material List";

      // ใส่ข้อมูลลงในเซลล์ใน Worksheet และกำหนดรูปแบบให้กับหัวเรื่อง
      worksheet["A2"].s = headerStyle;
      worksheet["A2"].v = "Material ID";

      worksheet["B2"].s = headerStyle;
      worksheet["B2"].v = "Material Name";

      worksheet["C2"].s = headerStyle;
      worksheet["C2"].v = "Category";

      worksheet["D2"].s = headerStyle;
      worksheet["D2"].v = "Unit";

      worksheet["E2"].s = headerStyle;
      worksheet["E2"].v = "Shelf";

      worksheet["F2"].s = headerStyle;
      worksheet["F2"].v = "Floor";

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "MaterialList");

      // แปลง Workbook ให้เป็นไฟล์ Excel
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const excelBlob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });

      // ดาวน์โหลดไฟล์ Excel
      saveAs(excelBlob, `${fileName}.xlsx`);
      setShowExportModal(false); // ปิด popup หลังจากดาวน์โหลด
    } else if (fileType === "pdf") {
      const generatePDF = () => {
        // ลงทะเบียนฟอนต์
        // Font.register({
        //   family: 'AngsanaNew', // ตั้งชื่อฟอนต์ที่คุณต้องการให้แสดงผล
        //   src: AngsanaNew, // ใช้ path ของฟอนต์ที่คุณนำเข้ามา
        // });

        const doc = new jsPDF();
        let verticalOffset = 10;

        paginatedReports.forEach((report) => {
          // <Text style={{ fontFamily: 'AngsanaNew' }}>Text with your custom font</Text>
          doc.text(report.orderDetails, 10, verticalOffset);
          doc.text(report.orderID, 10, verticalOffset + 10);
          // ... (add other content)
          verticalOffset += 20;
        });

        doc.save(`${fileName}.pdf`);
        setShowExportModal(false); // ปิด popup หลังจากดาวน์โหลด
      };

      generatePDF();
    }

    return null; // Return null or any other fallback if fileType is not 'pdf'
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

  return (
    <Card>
      <MapContainer
        center={[13.7563, 100.5018]} // ตำแหน่งศูนย์กลางของแผนที่
        zoom={10} // ระดับการซูมของแผนที่
        style={{ height: "400px", width: "100%" }} // กำหนดขนาดของแผนที่
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* วนลูปแสดง Marker บนแผนที่ */}
        {paginatedCryptoOrders.map((cryptoOrder, index) => {
          // แปลงข้อมูลตำแหน่งเป็น LatLngTuple
          const position: LatLngTuple = [
            cryptoOrder.latitude,
            cryptoOrder.longitude,
          ];

          return (
            <Marker key={cryptoOrder.id} position={position}>
              <Popup>
                <Typography variant="body1">{cryptoOrder.orderName}</Typography>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Adress</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder, index) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );
              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {index + 1}
                    </Typography>
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
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.orderName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.customerName}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.customerAddress}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(cryptoOrder.orderDate, "MMMM dd yyyy")}
                    </Typography>
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
      {/* Popup สำหรับการ สรุปรายการ */}
      <Modal
        open={showExportModal}
        onClose={handleCloseModal}
        aria-labelledby="export-modal-title"
        aria-describedby="export-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500, // เพิ่มความกว้างให้พอดีกับ PDFViewer
            height: 300, // เพิ่มความสูงให้พอดีกับ PDFViewer
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="export-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
            className="mb-5"
          >
            Export Data
          </Typography>
          {/* {pdfContent ? (
            <PDFViewer width={500} height={300}>
              {pdfContent}
            </PDFViewer>
          ) : (
            <Typography variant="body1">No content to display</Typography>
          )} */}
          {/* ส่วนอื่น ๆ ใน Modal */}
          <TextField
            label="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="file-type-label">File Type</InputLabel>
            <Select
              labelId="file-type-label"
              id="file-type-select"
              value={fileType}
              label="File Type"
              onChange={(e) => setFileType(e.target.value as string)}
            >
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="excel">Excel</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              component="a"
              disableRipple
              className="mr-5"
              onClick={handleExportConfirm}
            >
              Export
            </Button>
            <Button
              variant="contained"
              component="a"
              disableRipple
              color="error"
              onClick={handleCloseModal}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
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
