import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ListAltIcon from "@material-ui/icons/ListAlt";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { Link } from "@reach/router";
import Divider from "@material-ui/core/Divider";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import authContext from "../context/auth-context";
import { useContext } from "react";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
    },
  },
  appBar: {
    backgroundColor: "rgba(0,0,0,0.0)",
    border: 0,
    height: 0,
    padding: theme.spacing(0),
  },
  menuButton: {
    marginRight: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#344955",
    color: "#fffbff",
  },
  content: {
    minWidth: "85%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: 180,
    },
    [theme.breakpoints.down("xs")]: {
      minWidth: "100%",
    },
  },
}));

function SideDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const auth = useContext(authContext); //Logout logic should probably be in another component

  const drawer = (
    <List style={{ height: "100vh" }}>
      <Divider />
      {/* Side drawer content, links to other components in the router */}
      <ListItem button component={Link} to="/profile">
        <ListItemText primary={"Profile"} />
        <ListItemIcon>
          <AccountBoxIcon style={{ color: "#fffbff" }} />
        </ListItemIcon>
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/main">
        <ListItemText primary={"Main"} />
        <ListItemIcon>
          <FormatListNumberedIcon style={{ color: "#fffbff" }} />
        </ListItemIcon>
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/calendar">
        <ListItemText primary={"Calendar"} />
        <ListItemIcon>
          <EventNoteIcon style={{ color: "#fffbff" }} />
        </ListItemIcon>
      </ListItem>
      <Divider />
      <ListItem button component={Link} to="/topics">
        <ListItemText primary={"Topic Groups"} />
        <ListItemIcon>
          <ListAltIcon style={{ color: "#fffbff" }} />
        </ListItemIcon>
      </ListItem>
      <Divider />
    </List>
  );
  const logOutInDrawer = (
    <List style={{ marginTop: "auto" }}>
      <Divider />
      <ListItem
        button
        component={Link}
        to="/login"
        onClick={() => {
          auth.logout();
        }}
      >
        <ListItemText primary={"Logout"} />
        <ListItemIcon>
          <ExitToAppIcon style={{ color: "#fffbff" }} />
        </ListItemIcon>
      </ListItem>
      <Divider />
    </List>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} className={classes.appBar}>
        <div>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp>
          <Drawer
            container={container}
            variant="temporary"
            anchor={(theme.direction = "left")}
            onClose={handleDrawerToggle}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
            {logOutInDrawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
            {logOutInDrawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{props.children}</main>
    </div>
  );
}

export default SideDrawer;
