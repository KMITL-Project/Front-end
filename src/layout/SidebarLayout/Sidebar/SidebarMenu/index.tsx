import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
} from "@mui/material";

import DesignServicesTwoToneIcon from "@mui/icons-material/DesignServicesTwoTone";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import MmsTwoToneIcon from "@mui/icons-material/MmsTwoTone";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import BallotTwoToneIcon from "@mui/icons-material/BallotTwoTone";
import BeachAccessTwoToneIcon from "@mui/icons-material/BeachAccessTwoTone";
import EmojiEventsTwoToneIcon from "@mui/icons-material/EmojiEventsTwoTone";
import FilterVintageTwoToneIcon from "@mui/icons-material/FilterVintageTwoTone";
import HowToVoteTwoToneIcon from "@mui/icons-material/HowToVoteTwoTone";
import LocalPharmacyTwoToneIcon from "@mui/icons-material/LocalPharmacyTwoTone";
import RedeemTwoToneIcon from "@mui/icons-material/RedeemTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import TrafficTwoToneIcon from "@mui/icons-material/TrafficTwoTone";
import CheckBoxTwoToneIcon from "@mui/icons-material/CheckBoxTwoTone";
import ChromeReaderModeTwoToneIcon from "@mui/icons-material/ChromeReaderModeTwoTone";
import WorkspacePremiumTwoToneIcon from "@mui/icons-material/WorkspacePremiumTwoTone";
import CameraFrontTwoToneIcon from "@mui/icons-material/CameraFrontTwoTone";
import DisplaySettingsTwoToneIcon from "@mui/icons-material/DisplaySettingsTwoTone";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LayersIcon from '@mui/icons-material/Layers';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import ShareLocationTwoToneIcon from '@mui/icons-material/ShareLocationTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';

import Link from "next/link";
import { useDispatch } from "react-redux";
import { sidebarIsClose } from "@/store/systemStore";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

const SidebarMenu = () => {
  const dispatch = useDispatch();

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Overview
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/dashboard/"
                  startIcon={<BrightnessLowTwoToneIcon />}
                >
                  Dashboards
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Management
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/management/material"
                  startIcon={<TableChartTwoToneIcon />}
                >
                   วัสดุทั้งหมด
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/management/materialAdd"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  เพิ่มวัสดุ
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/management/pickup"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  เบิกวัสดุ
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/management/report"
                  startIcon={<TableChartTwoToneIcon />}
                >
                  รายงาน
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Logistic
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/logistic/customerList"
                  startIcon={<ListAltTwoToneIcon />}
                >
                  รายการลูกค้า
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/logistic/order"
                  startIcon={<DescriptionTwoToneIcon />}
                >
                  ใบสั่ง
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/logistic/tracking"
                  startIcon={<ShareLocationTwoToneIcon />}
                >
                  ติดตามการขนส่ง
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Set Up
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/setup/shelf/"
                  startIcon={<DoorSlidingIcon />}
                >
                  Shelf
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/setup/category/"
                  startIcon={<CategoryIcon />}
                >
                  Category
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/setup/unit/"
                  startIcon={<InventoryIcon />}
                >
                  Unit of products
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/setup/material"
                  startIcon={<LayersIcon />}
                >
                  Material type
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={Link}
                  onClick={() => {
                    dispatch(sidebarIsClose);
                  }}
                  href="/setup/permission"
                  startIcon={<AdminPanelSettingsIcon />}
                >
                  User Permission
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
};

export default SidebarMenu;
