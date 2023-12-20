import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {Tooltip, Divider, Box, FormControl, InputLabel, Card, Checkbox, IconButton, Table,
  TableBody, TableCell, TableHead, TablePagination, TableRow, TableContainer, Select,
  MenuItem, Typography, useTheme, CardHeader
} from '@mui/material';
import { MaterialInfo, MaterialInfoStatus } from "@/model/management/materialInfo";
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from '../BulkActions';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

interface RecentOrdersTableProps {
  className?: string;
  MaterialInfos: MaterialInfo[];
}

interface Filters {
  status?: MaterialInfoStatus;
}

const applyFilters = (
  MaterialInfos: MaterialInfo[],
  filters: Filters
): MaterialInfo[] => {
  return MaterialInfos.filter((MaterialInfo) => {
    let matches = true;

    if (filters.status && MaterialInfo.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  MaterialInfos: MaterialInfo[],
  page: number,
  limit: number
): MaterialInfo[] => {
  return MaterialInfos.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ MaterialInfos }) => {
  const [selectedMaterialInfos, setSelectedMaterialInfos] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedMaterialInfos.length > 0;
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

  const handleSelectAllMaterialInfos = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedMaterialInfos(
      event.target.checked
        ? MaterialInfos.map((MaterialInfo) => MaterialInfo.id)
        : []
    );
  };

  const handleSelectOneMaterialInfo = (
    _event: ChangeEvent<HTMLInputElement>,
    MaterialInfoId: string
  ): void => {
    if (!selectedMaterialInfos.includes(MaterialInfoId)) {
      setSelectedMaterialInfos((prevSelected) => [
        ...prevSelected,
        MaterialInfoId
      ]);
    } else {
      setSelectedMaterialInfos((prevSelected) =>
        prevSelected.filter((id) => id !== MaterialInfoId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredMaterialInfos = applyFilters(MaterialInfos, filters);
  const paginatedMaterialInfos = applyPagination(
    filteredMaterialInfos,
    page,
    limit
  );
  const selectedSomeMaterialInfos =
    selectedMaterialInfos.length > 0 &&
    selectedMaterialInfos.length < MaterialInfos.length;
  const selectedAllMaterialInfos =
    selectedMaterialInfos.length === MaterialInfos.length;
  const theme = useTheme();
  const router = useRouter();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          title="Lot lists"
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
                  checked={selectedAllMaterialInfos}
                  indeterminate={selectedSomeMaterialInfos}
                  onChange={handleSelectAllMaterialInfos}
                />
              </TableCell>
              <TableCell align="center">Lot</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
              {/* <TableCell>Action</TableCell> */}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMaterialInfos.map((MaterialInfo) => {
              const isMaterialInfoSelected = selectedMaterialInfos.includes(
                MaterialInfo.id
              );
              
              return (
                <TableRow
                  hover
                  key={MaterialInfo.id}
                  selected={isMaterialInfoSelected}
                >
                  <TableCell padding="checkbox" align="center">
                    <Checkbox
                      color="primary"
                      checked={isMaterialInfoSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneMaterialInfo(event, MaterialInfo.id)
                      }
                      value={isMaterialInfoSelected}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {MaterialInfo.lot}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {MaterialInfo.price}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {MaterialInfo.amount}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body1" fontWeight="bold" color="text.primary" gutterBottom noWrap>
                      {format(MaterialInfo.orderDate, 'MM/dd/yyyy')}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="View material" arrow>
                        <IconButton
                          onClick={() => router.push(`/management/material/info/lotInfo/${MaterialInfo.lot}`)}
                          sx={{
                            '&:hover': {
                              background: theme.colors.info.lighter
                            },
                            color: theme.palette.info.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <VisibilityTwoToneIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit material" arrow>
                      <IconButton
                        onClick={() => router.push(`/management/material/info/lotEdit/${MaterialInfo.lot}`)}
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
          count={filteredMaterialInfos.length}
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
  MaterialInfos: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  MaterialInfos: []
};

export default RecentOrdersTable;
