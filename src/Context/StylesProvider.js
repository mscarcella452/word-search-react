import { createContext } from "react";
import { defaultLetterBoxSx } from "../Styles/LetterBoxStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const letterBoxContext = createContext();

const breakpoints = {
  values: {
    xxs: 0,
    xs: 325,
    mobile: 500,
    sm: 650,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

function StylesProvider({ letterBoxStyles, customColors, children }) {
  const letterBoxSx = {
    unselectedBoxes: {
      ...defaultLetterBoxSx.unselectedBoxes,
      ...letterBoxStyles.unselectedBoxes,
    },

    foundBoxes: {
      ...defaultLetterBoxSx.foundBoxes,
      ...letterBoxStyles.foundBoxes,
    },
    highlightedBoxes: {
      ...defaultLetterBoxSx.highlightedBoxes,
      ...letterBoxStyles.highlightedBoxes,
    },
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: customColors.primary.background,
        color: customColors.primary.color,
        borderColor: customColors.primary.borderColor,
        hoverBackground: customColors.primary.hoverBackground,
      },

      foundWord: {
        main: customColors.foundWord.background,
        color: customColors.foundWord.color,
      },
      fail: {
        main: customColors.fail.background,
        color: customColors.fail.color,
      },
    },

    breakpoints: breakpoints,
  });

  return (
    <ThemeProvider theme={theme}>
      <letterBoxContext.Provider value={letterBoxSx}>
        {children}
      </letterBoxContext.Provider>
    </ThemeProvider>
  );
}

export default StylesProvider;
