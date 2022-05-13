import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { List, ListItem } from "@mui/material";
// import ListItem from '@mui/material/ListItem';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// ICON  IMPORT
import PanToolTwoToneIcon from "@mui/icons-material/PanToolTwoTone";
import MenuIcon from "@mui/icons-material/Menu";
import DesktopMacTwoToneIcon from "@mui/icons-material/DesktopMacTwoTone";
import DescriptionTwoToneIcon from "@mui/icons-material/DescriptionTwoTone";
import UnarchiveTwoToneIcon from "@mui/icons-material/UnarchiveTwoTone";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AddThings from './AddThing'
import Move from './MoveLocation'

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key={"resive"}>
          <ListItemIcon>
            {" "}
            <DesktopMacTwoToneIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"รับอุปกรณ์"} />
        </ListItem>
        <ListItem button key={"resive"}>
          <ListItemIcon>
            {" "}
            <PanToolTwoToneIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"เบิกอุปกรณ์"} />
        </ListItem>
        <ListItem button key={"resive"}>
          <ListItemIcon>
            {" "}
            <UnarchiveTwoToneIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"ย้ายที่เก็บ"} />
        </ListItem>
        <ListItem button key={"resive"}>
          <ListItemIcon>
            {" "}
            <DescriptionTwoToneIcon />{" "}
          </ListItemIcon>
          <ListItemText primary={"รายงาน"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <ThemeProvider theme={darkTheme}>

        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Chonburi Hospital
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />


        <Move />
      
      
      
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
