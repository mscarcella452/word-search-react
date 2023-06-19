import { createTheme } from "@mui/material/styles";

const defaultColors = {
  primary: {
    main: "#3F497F",
    color: "#fff",
  },
  secondary: {
    main: "#F7C04A",
    color: "#333",
  },
  foundWord: { background: "#539165", color: "#fff" },
  fail: { background: "#EB5353", color: "#fff" },
};

export const wordSearchTheme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 325,
      mobile: 500,
      sm: 650,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  palette: {
    primary: {
      main: defaultColors.primary.main,
      color: defaultColors.primary.color,
    },
    secondary: {
      main: defaultColors.secondary.main,
      color: defaultColors.secondary.color,
    },

    foundWord: {
      main: defaultColors.foundWord.background,
      color: defaultColors.foundWord.color,
    },
    fail: {
      main: defaultColors.fail.background,
      color: defaultColors.fail.color,
    },
  },
});
