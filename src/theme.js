import { createTheme } from "@mui/material/styles"

// Using the theme from your blog project
const theme = createTheme({
  palette: {
    primary: {
      main: "#387369", // pastel green
      second: "#5AB8A8",
      third: "#22453F",
    },
    secondary: {
      main: "#F6F4F0", // Light Cream
      second: "#5AB8A8",
    },
    customColors: {
      pink: "#D798B0",
      purple: "#8F5B8A",
      darkblue: "#2E5077",
      lightgreen: "#4DA1A9",
      green: "#79D7BE",
      darkgreen: "#459198",
    },
    error: {
      main: "#d32f2f",
      light: "#ffffff"
    },
    background: {
      default: "#F7F7F7",
      paper: "#F6F4F0",
    },
    text: {
      primary: "#181a1b",
      secondary: "#4b5563",
    },
    action: {
      disabledBackground: "#F7F7F7",
    },
    divider: "#dddcd8",
  },
  typography: {
    fontFamily: "'Urbanist', serif",
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        },
        containedPrimary: {
          color: "#F6F4F0", // offWhite
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
  },
})

export default theme
