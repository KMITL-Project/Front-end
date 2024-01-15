import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import  toBlob  from '@react-pdf/renderer';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import {
  Divider,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CardHeader,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import { Report, ReportStatus } from '@/model/management/report';
import BulkActions from './BulkActions';
import { PDFViewer, Document, Page, Text, View, PDFDownloadLink, Font } from '@react-pdf/renderer';
// import SarabunRegular from './fonts/Sarabun-Regular.ttf';
// import SarabunBold from './fonts/Sarabun-Bold.ttf';
// import AngsanaNew from '@/fonts/AngsanaNew.ttf';


interface RecentOrdersTableProps {
  className?: string;
  Reports: Report[];
}

interface Filters {
  status?: ReportStatus;
}

const applyFilters = (
  Reports: Report[],
  filters: Filters
): Report[] => {
  return Reports.filter((Report) => {
    let matches = true;

    if (filters.status && Report.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  Reports: Report[],
  page: number,
  limit: number
): Report[] => {
  return Reports.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ Reports }) => {
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('pdf');

  const selectedBulkActions = selectedReports.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: 'completed'
  });
  const [pdfContent, setPdfContent] = useState<any>(null);

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value: any;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllReports = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedReports(
      event.target.checked
        ? Reports.map((Report) => Report.id)
        : []
    );
  };

  const handleSelectOneReport = (
    _event: ChangeEvent<HTMLInputElement>,
    ReportId: string
  ): void => {
    if (!selectedReports.includes(ReportId)) {
      setSelectedReports((prevSelected) => [
        ...prevSelected,
        ReportId
      ]);
    } else {
      setSelectedReports((prevSelected) =>
        prevSelected.filter((id) => id !== ReportId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleExportClick = () => {
    // ตรวจสอบว่ามีรายการที่ถูกเลือกหรือไม่
    if (selectedReports.length === 0) {
      // แสดง popup แจ้งเตือนเมื่อไม่มีรายการที่ถูกเลือก
      alert('Please select items to export.');
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
    if (fileType === 'excel') {
      // สร้างชุดข้อมูลสำหรับ Excel
      const dataForExcel: any[][] = paginatedReports.map((report, index) => [
        index + 1, // เลขลำดับอัตโนมัติ
        report.orderDetails,
        report.orderID,
        report.sourceName,
        report.unit,
        report.shelf,
        report.floor,
      ]);
    
      // เพิ่มข้อความที่ A1
      const worksheet = XLSX.utils.aoa_to_sheet([
        ['ชื่อบริษัทภาษาไทย', '', '', '', '', '', '', '', '', '', 'เลขที่', ''], // เพิ่มข้อความที่ A1
        ['ชื่อบริษัทภาษาอังกฤษ'], // เพิ่มข้อความที่ A2
        ['', '', '', '', 'รายการสินค้า', ''],
        ['', '', '', '', '', '', '', '', '', '', 'วันที่', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['ลำดับ', 'วันที่', 'รหัสสินค้า', 'รายการ', 'หมวดหมู่', 'หน่วย', 'ชั้นวาง', 'ชั้น', 'ล็อต', 'จำนวน', 'ราคา', 'หมายเหตุ'],
        ...dataForExcel,
      ]);
    
      if (worksheet['!ref']) {
        const range = XLSX.utils.decode_range(worksheet['!ref']);
      
        // เพิ่ม border ในแต่ละเซลล์
        for (let R = range.s.r; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { r: R, c: C };
            const cellStyle = worksheet[XLSX.utils.encode_cell(cellAddress)] || {};
            cellStyle.s = {
              border: {
                top: { style: 'thin', color: { auto: 1 } },
                bottom: { style: 'thin', color: { auto: 1 } },
                left: { style: 'thin', color: { auto: 1 } },
                right: { style: 'thin', color: { auto: 1 } },
              },
              ...cellStyle.s,
            };
            worksheet[XLSX.utils.encode_cell(cellAddress)] = cellStyle;
          }
        }
      }
    
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'MaterialList');
    
      // แปลง Workbook ให้เป็นไฟล์ Excel
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    
      // ดาวน์โหลดไฟล์ Excel
      saveAs(excelBlob, `${fileName}.xlsx`);
      setShowExportModal(false); // ปิด popup หลังจากดาวน์โหลด
    }
    else if (fileType === 'pdf') {
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

  const filteredReports = applyFilters(Reports, filters);
  const paginatedReports = applyPagination(
    filteredReports,
    page,
    limit
  );
  const selectedSomeReports =
    selectedReports.length > 0 &&
    selectedReports.length < Reports.length;
  const selectedAllReports =
    selectedReports.length === Reports.length;
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title="Material lists"
        action={
          <Button
            variant="contained"
            component="a"
            sx={{ margin: 1 }}
            disableRipple
            onClick={handleExportClick}
          >
            Export
          </Button>
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" align="center">
                <Checkbox
                  color="primary"
                  checked={selectedAllReports}
                  indeterminate={selectedSomeReports}
                  onChange={handleSelectAllReports}
                />
              </TableCell>
              <TableCell align="center">Material ID</TableCell>
              <TableCell align="center">Material Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Unit</TableCell>
              <TableCell align="center">Shelf</TableCell>
              <TableCell align="center">Floor</TableCell>
              {/* <TableCell align="right">Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedReports.map((Report) => {
              const isReportSelected = selectedReports.includes(
                Report.id
              );
              return (
                <TableRow
                  hover
                  key={Report.id}
                  selected={isReportSelected}
                >
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      color="primary"
                      checked={isReportSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneReport(event, Report.id)
                      }
                      value={isReportSelected}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Report.orderDetails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(Report.orderDate, 'MMMM dd yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Report.orderID}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Report.sourceName}
                    </Typography>

                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Report.unit}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Report.shelf}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Report.floor}
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
          count={filteredReports.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
      {/* Popup สำหรับการ Export */}
      <Modal
        open={showExportModal}
        onClose={handleCloseModal}
        aria-labelledby="export-modal-title"
        aria-describedby="export-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500, // เพิ่มความกว้างให้พอดีกับ PDFViewer
            height: 300, // เพิ่มความสูงให้พอดีกับ PDFViewer
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="export-modal-title" variant="h6" component="h2" gutterBottom className='mb-5'>
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" component="a" disableRipple className='mr-5' onClick={handleExportConfirm}>
              Export
            </Button>
            <Button variant="contained" component="a" disableRipple color="error" onClick={handleCloseModal} sx={{ mr: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

    </Card>
  );
};

RecentOrdersTable.propTypes = {
  Reports: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  Reports: []
};

export default RecentOrdersTable;