import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
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
  CardHeader
} from '@mui/material';

import { Report, ReportStatus } from '@/model/management/report';
import BulkActions from './BulkActions';

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
  const [selectedReports, setSelectedReports] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedReports.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: 'completed'
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

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
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          title="Material lists"
        />
      )}
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
