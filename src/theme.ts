import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          backgroundColor: "transparent !important",
          border: "1px solid #E0E0E0",
          borderRadius: "4px",
          "::before": {
            display: "none",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          height: "40px",
        },
      },
    },
  },
})

export default theme
