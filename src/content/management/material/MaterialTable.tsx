import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {Tooltip, Divider, Box, Card, Checkbox, IconButton, Table,
  TableBody, TableCell, TableHead, TablePagination, TableRow, TableContainer,
  Typography, useTheme, CardHeader
} from '@mui/material';
import { materialOrder, materialStatus } from '@/model/management/material';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface RecentOrdersTableProps {
  className?: string;
  materialOrders: materialOrder[];
}

interface Filters {
  status?: materialStatus;
}

const applyFilters = (
  materialOrders: materialOrder[],
  filters: Filters
): materialOrder[] => {
  return materialOrders.filter((materialOrder) => {
    let matches = true;

    if (filters.status && materialOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  materialOrders: materialOrder[],
  page: number,
  limit: number
): materialOrder[] => {
  return materialOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ materialOrders }) => {
  
  const router = useRouter();
  const [selectedmaterialOrders, setSelectedmaterialOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedmaterialOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({status: 'completed'});

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

  const handleSelectAllmaterialOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedmaterialOrders(
      event.target.checked
        ? materialOrders.map((materialOrder) => materialOrder.id)
        : []
    );
  };

  const handleSelectOnematerialOrder = (
    _event: ChangeEvent<HTMLInputElement>,
    materialOrderId: string
  ): void => {
    if (!selectedmaterialOrders.includes(materialOrderId)) {
      setSelectedmaterialOrders((prevSelected) => [
        ...prevSelected,
        materialOrderId
      ]);
    } else {
      setSelectedmaterialOrders((prevSelected) =>
        prevSelected.filter((id) => id !== materialOrderId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredmaterialOrders = applyFilters(materialOrders, filters);
  const paginatedmaterialOrders = applyPagination(
    filteredmaterialOrders,
    page,
    limit
  );
  const selectedSomematerialOrders =
    selectedmaterialOrders.length > 0 &&
    selectedmaterialOrders.length < materialOrders.length;
  const selectedAllmaterialOrders =
    selectedmaterialOrders.length === materialOrders.length;
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
                  checked={selectedAllmaterialOrders}
                  indeterminate={selectedSomematerialOrders}
                  onChange={handleSelectAllmaterialOrders}
                />
              </TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">unit</TableCell>
              <TableCell align="center">shelf</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedmaterialOrders.map((materialOrder) => {
              const ismaterialOrderSelected = selectedmaterialOrders.includes(
                materialOrder.id
              );
              
              return (
                <TableRow
                  hover
                  key={materialOrder.id}
                  selected={ismaterialOrderSelected}
                >
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      color="primary"
                      checked={ismaterialOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOnematerialOrder(event, materialOrder.id)
                      }
                      value={ismaterialOrderSelected}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {materialOrder.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {format(materialOrder.orderDate, 'MMMM dd yyyy')}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {materialOrder.category}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {materialOrder.amount}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {materialOrder.unit}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {materialOrder.shelf}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="View material" arrow>
                    {/* <Link href={`/management/material/info/${materialOrder.id}`} passHref> */}
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.info.lighter
                            },
                            color: theme.palette.info.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => router.push(`/management/material/info/${materialOrder.id}`)}
                        >
                          <VisibilityTwoToneIcon fontSize="small" />
                        </IconButton>
                      {/* </Link> */}
                    </Tooltip>

                    <Tooltip title="Edit material" arrow>
                      {/* <Link href={`/management/material/edit/${materialOrder.id}`} passHref> */}
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => router.push(`/management/material/edit/${materialOrder.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                      {/* </Link> */}
                    </Tooltip>
                    <Tooltip title="Delete material" arrow>
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
          count={filteredmaterialOrders.length}
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
  materialOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  materialOrders: []
};

export default RecentOrdersTable;
