<<<<<<< HEAD
import { useState, useRef } from "react";
=======
import { useState, useRef } from 'react';
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b

import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
  Modal,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
<<<<<<< HEAD
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import { format } from "date-fns";
import { Order, OrderStatus } from "@/model/logistic/order";
import { Tracking } from "@/model/logistic/tracking";
=======
  TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { format } from 'date-fns';
import { Order, OrderStatus } from '@/model/logistic/order';
import { Tracking } from '@/model/logistic/tracking';

>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

<<<<<<< HEAD
interface BulkActionsProps {
  Tracks: Tracking[];
}

function BulkActions({ Tracks }: BulkActionsProps) {
=======

interface BulkActionsProps {
    Tracks: Tracking[]
}

function BulkActions({  Tracks}: BulkActionsProps) {
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b
  const [onMenuOpen, menuOpen] = useState<boolean>(false);
  const [isBulkAddModalOpen, setBulkAddModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const moreRef = useRef<HTMLButtonElement | null>(null);

  const openMenu = (): void => {
    menuOpen(true);
  };

  const closeMenu = (): void => {
    menuOpen(false);
  };

  const openBulkAddModal = (): void => {
    setBulkAddModalOpen(true);
    closeMenu(); // Close the menu when the modal is opened
  };

  const closeBulkAddModal = (): void => {
    setBulkAddModalOpen(false);
  };

  // Function to handle data selection
  const handleDataSelection = (): void => {
    // Replace this with your logic to get selected data
    // For example, you might get the selected data from a state
    const mockSelectedData = ["Item 1", "Item 2", "Item 3"];
    setSelectedData(mockSelectedData);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            Bulk actions:
          </Typography>
          <ButtonError
            sx={{ ml: 1 }}
            startIcon={<DeleteTwoToneIcon />}
            variant="contained"
          >
            Delete
          </ButtonError>
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{ ml: 2, p: 1 }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
<<<<<<< HEAD
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem
            button
            onClick={() => {
              handleDataSelection();
              openBulkAddModal();
            }}
          >
=======
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List sx={{ p: 1 }} component="nav">
          <ListItem button onClick={() => { handleDataSelection(); openBulkAddModal(); }}>
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b
            <ListItemText primary="Bulk add selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk delete selected" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Bulk edit selected" />
          </ListItem>
        </List>
      </Menu>

      {/* Modal for Bulk Add */}
      <Modal
        open={isBulkAddModalOpen}
        onClose={closeBulkAddModal}
        aria-labelledby="bulk-add-modal-title"
        aria-describedby="bulk-add-modal-description"
      >
        <Box
          sx={{
<<<<<<< HEAD
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
=======
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b
            boxShadow: 24,
            p: 4,
          }}
        >
<<<<<<< HEAD
          <Typography
            id="bulk-add-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
=======
          <Typography id="bulk-add-modal-title" variant="h6" component="h2" gutterBottom>
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b
            สรุปรายการ
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Customers</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Date</TableCell>
                  {/* Add more columns as needed */}
                </TableRow>
              </TableHead>
              <TableBody>
                {Tracks.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.orderID}</TableCell>
                    <TableCell>{item.customerAddress}</TableCell>
<<<<<<< HEAD
                    <TableCell>
                      {format(item.orderDate, "MMMM dd yyyy")}
                    </TableCell>
=======
                    <TableCell>{format(item.orderDate, "MMMM dd yyyy")}</TableCell>
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b
                    {/* Add more cells as needed */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
<<<<<<< HEAD
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              component="a"
              disableRipple
              className="mr-5"
            >
              Ok
            </Button>
            <Button
              variant="contained"
              component="a"
              disableRipple
              color="error"
              onClick={closeBulkAddModal}
              sx={{ mr: 2 }}
            >
=======
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" component="a" disableRipple className='mr-5' >
              Ok
            </Button>
            <Button variant="contained" component="a" disableRipple color="error" onClick={closeBulkAddModal} sx={{ mr: 2 }}>
>>>>>>> e6b68e7ef7641f6b2a412411314ee10fb8c87c8b
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default BulkActions;
