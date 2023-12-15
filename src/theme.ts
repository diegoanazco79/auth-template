import { createTheme } from "@mui/material/styles"

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    error: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#087433"
    }
  },
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: {variant: 'error'},
          style:{
            fontFamily: 'Montserrat',
            marginLeft: '14px !important',
            textAlign: 'left',
            marginTop: '1px !important',
            fontSize: '12px',
            color: '#d32f2f',
          }
        }
      ]
    },
    
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent !important",
          border: "1px solid #E0E0E0",
          borderRadius: "4px",
          "::before": {
            display: "none",
          },
          "&.Mui-error": {
            borderColor: "#d32f2f", 
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginTop: "3px",
          fontSize: "14px",
          "&.Mui-error": {
            borderColor: "#d32f2f", 
          },
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
