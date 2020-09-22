import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#4F5D75",
      contrastText: "#fff",
      paper: "#3f50b5",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
      paper: "#f44336",
    },
    background: {
      paper: "#fffbff",
      default: "#edf0f2",
    },
  },
  status: {
    danger: "orange",
  },
});

export default theme;
