import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PropTypes from 'prop-types';

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        height: '100%'
      }}
    >
      {children}
    </Box>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node
};
export default MainLayout;

