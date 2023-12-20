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
} from "@mui/material";

import Label from "@/components/Label";
import { Shelf, ShelfStatus  } from "@/model/setup/shelf";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import BulkActions from "./BulkActions";
import NextLink from "next/link";
import { useRouter } from 'next/router';

interface SetupShelfTableProps {
  className?: string;
  mockShelves: Shelf[];
}

interface Filters {
  status?: ShelfStatus;
}

// const getStatusLabel = (ShelfStatus: ShelfStatus): JSX.Element => {
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

//   const { text, color }: any = map[ShelfStatus];

//   return <Label color={color}>{text}</Label>;
// };

const applyFilters = (
  mockShelves: Shelf[],
  filters: Filters
): Shelf[] => {
  return mockShelves.filter((mockShelve) => {
    let matches = true;

    if (filters.status && mockShelve.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  mockShelves: Shelf[],
  page: number,
  limit: number
): Shelf[] => {
  return mockShelves.slice(page * limit, page * limit + limit);
};

const SetupShelfTable: FC<SetupShelfTableProps> = ({ mockShelves }) => {
  const router = useRouter();
  const [selectedMockShelves, setSelectedMockShelves] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedMockShelves.length > 0;
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
    let value: any;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllSetupShelf = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedMockShelves(
      event.target.checked
        ? mockShelves.map((mockShelve) => mockShelve.id)
        : []
    );
  };

  const handleSelectOneSetupShelf = (
    _event: ChangeEvent<HTMLInputElement>,
    setupShelfId: string
  ): void => {
    if (!selectedMockShelves.includes(setupShelfId)) {
      setSelectedMockShelves((prevSelected) => [
        ...prevSelected,
        setupShelfId,
      ]);
    } else {
      setSelectedMockShelves((prevSelected) =>
        prevSelected.filter((id) => id !== setupShelfId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredMockShelves = applyFilters(mockShelves, filters);
  const paginatedMockShelves = applyPagination(
    filteredMockShelves,
    page,
    limit
  );
  const selectedSomeMockShelves =
    selectedMockShelves.length > 0 &&
    selectedMockShelves.length < mockShelves.length;
  const selectedAllMockShelves =
    selectedMockShelves.length === mockShelves.length;
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
          title="Shelf lists"
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
                  checked={selectedAllMockShelves}
                  indeterminate={selectedSomeMockShelves}
                  onChange={handleSelectAllSetupShelf}
                />
              </TableCell>
              <TableCell>Shelf ID</TableCell>
              <TableCell>Shelf Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMockShelves.map((mockShelve) => {
              const isMockShelvesSelected = selectedMockShelves.includes(
                mockShelve.id
              );
              return (
                <TableRow
                  hover
                  key={mockShelve.id}
                  selected={isMockShelvesSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isMockShelvesSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneSetupShelf(event, mockShelve.id)
                      }
                      value={isMockShelvesSelected}
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
                      {mockShelve.shelfID}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(mockShelve.orderDate, "MMMM dd yyyy")}
                    </Typography> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {mockShelve.shelfName}
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
                      {mockShelve.shelfDescription}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {mockShelve.sourceDesc}
                    </Typography> */}
                  </TableCell>

                  {/* <TableCell align="right">
                    {getStatusLabel(mockShelve.status)}
                  </TableCell> */}
                  <TableCell align="center">
                    <Tooltip title="View Shelf" arrow>
                        <IconButton
                          sx={{
                            "&:hover": {
                              background: theme.colors.info.lighter,
                            },
                            color: theme.palette.info.main,
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => router.push('/setup/shelf/info')}
                        >
                          <VisibilityTwoToneIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Order" arrow>

                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => router.push('/setup/shelf/AddShelf')}
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
          count={filteredMockShelves.length}
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

SetupShelfTable.propTypes = {
  mockShelves: PropTypes.array.isRequired,
};

SetupShelfTable.defaultProps = {
  mockShelves: [],
};

export default SetupShelfTable;
