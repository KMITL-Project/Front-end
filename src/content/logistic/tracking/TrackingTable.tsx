import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
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
  CardHeader
} from '@mui/material';

import Label from '@/components/Label';
import { Tracking, TrackingStatus } from '@/model/logistic/tracking';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import NextLink from "next/link";


interface RecentOrdersTableProps {
  className?: string;
  Trackings: Tracking[];
}

interface Filters {
  status?: TrackingStatus;
}

// const getStatusLabel = (TrackingStatus: TrackingStatus): JSX.Element => {
//   const map = {
//     failed: {
//       text: 'Failed',
//       color: 'error'
//     },
//     completed: {
//       text: 'Completed',
//       color: 'success'
//     },
//     pending: {
//       text: 'Pending',
//       color: 'warning'
//     }
//   };

//   const { text, color }: any = map[TrackingStatus];

//   return <Label color={color}>{text}</Label>;
// };

const applyFilters = (
  Trackings: Tracking[],
  filters: Filters
): Tracking[] => {
  return Trackings.filter((Tracking) => {
    let matches = true;

    if (filters.status && Tracking.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  Trackings: Tracking[],
  page: number,
  limit: number
): Tracking[] => {
  return Trackings.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ Trackings }) => {
  const [selectedTrackings, setSelectedTrackings] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedTrackings.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
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

  const handleSelectAllTrackings = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTrackings(
      event.target.checked
        ? Trackings.map((Tracking) => Tracking.id)
        : []
    );
  };

  const handleSelectOneTracking = (
    _event: ChangeEvent<HTMLInputElement>,
    TrackingId: string
  ): void => {
    if (!selectedTrackings.includes(TrackingId)) {
      setSelectedTrackings((prevSelected) => [
        ...prevSelected,
        TrackingId
      ]);
    } else {
      setSelectedTrackings((prevSelected) =>
        prevSelected.filter((id) => id !== TrackingId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredTrackings = applyFilters(Trackings, filters);
  const paginatedTrackings = applyPagination(
    filteredTrackings,
    page,
    limit
  );
  const selectedSomeTrackings =
    selectedTrackings.length > 0 &&
    selectedTrackings.length < Trackings.length;
  const selectedAllTrackings =
    selectedTrackings.length === Trackings.length;
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
          // action={
          //   // <Box width={150}>
          //   //   <FormControl fullWidth variant="outlined">
          //   //     <InputLabel>Status</InputLabel>
          //   //     <Select
          //   //       value={filters.status || 'all'}
          //   //       onChange={handleStatusChange}
          //   //       label="Status"
          //   //       autoWidth
          //   //     >
          //   //       {statusOptions.map((statusOption) => (
          //   //         <MenuItem key={statusOption.id} value={statusOption.id}>
          //   //           {statusOption.name}
          //   //         </MenuItem>
          //   //       ))}
          //   //     </Select>
          //   //   </FormControl>
          //   // </Box>
          // }
          title="Category lists"
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
                  checked={selectedAllTrackings}
                  indeterminate={selectedSomeTrackings}
                  onChange={handleSelectAllTrackings}
                />
              </TableCell>
              <TableCell>Cat ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrackings.map((Tracking) => {
              const isTrackingSelected = selectedTrackings.includes(
                Tracking.id
              );
              return (
                <TableRow
                  hover
                  key={Tracking.id}
                  selected={isTrackingSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isTrackingSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneTracking(event, Tracking.id)
                      }
                      value={isTrackingSelected}
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
                      {Tracking.orderDetails}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(Tracking.orderDate, 'MMMM dd yyyy')}
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
                      {Tracking.orderID}
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
                      {Tracking.sourceName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Tracking.sourceDesc}
                    </Typography>
                  </TableCell>
                  {/* <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Tracking.amountCrypto}
                      {Tracking.cryptoCurrency}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {numeral(Tracking.amount).format(
                        `${Tracking.currency}0,0.00`
                      )}
                    </Typography>
                  </TableCell> */}
                  {/* <TableCell align="right">
                    {getStatusLabel(Tracking.status)}
                  </TableCell> */}
                  
                  <TableCell align="right">
                  <Tooltip title="View Category" arrow>
                      <NextLink href="/setup/category/AddCategory" passHref>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.info.lighter,
                            },
                            color: theme.palette.info.main,
                          }}
                          color="inherit"
                          size="small"
                        >
                          <VisibilityTwoToneIcon fontSize="small" />
                        </IconButton>
                      </NextLink>
                    </Tooltip>
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
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
          count={filteredTrackings.length}
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
  Trackings: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  Trackings: []
};

export default RecentOrdersTable;
