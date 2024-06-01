import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      spacing: {
        small: string;
        medium: string;
        large: string;
      };
      borderRadius: {
        small: string;
        medium: string;
        large: string;
      };
      backgroundColor:{
        main: string;
        default: string;
      };
      imageSize:{
        width: string;
        height: string;
      };
      paperSize:{
        sm: string,
        md: string,
      }
    };
  }
  interface ThemeOptions {
    custom?: {
      spacing?: {
        small?: string;
        medium?: string;
        large?: string;
      };
      borderRadius?: {
        small?: string;
        medium?: string;
        large?: string;
      };
      backgroundColor?:{
        main?: string;
        default?: string;
      };
      imageSize?:{
        width?: string;
        height?: string;
      };
      paperSize?:{
        sm?: string,
        md?: string,
      }
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#02A9F4", // Light Blue
    },
    secondary: {
      main: "#FF9801", // Orange
    },
    background: {
      default: "#CFD8DC", // Light Gray
    },
    text: {
      primary: "#000000", // Black
      secondary: "#9E9E9E", // Dark Gray
    },
  },
  
  custom: {
    spacing: {
      small: "8px",
      medium: "16px",
      large: "24px",
    },
    borderRadius: {
      small: "4px",
      medium: "8px",
      large: "16px",
    },
    backgroundColor:{
        main: "#CFD8DC",
        default: "white"
    },
    imageSize:{
      width: "50px",
      height: "50px",
    },
    paperSize:{
      sm: "500px",
      md: "720px",
    }
  },
});

export default theme;
