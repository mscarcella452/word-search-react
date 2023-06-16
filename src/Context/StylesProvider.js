import { createContext } from "react";
import { defaultLetterBoxSx } from "../Styles/LetterBoxStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const letterBoxContext = createContext();

const breakpoints = {
  values: {
    // mobile_xxs: 0,
    // mobile_xs: 325,
    // mobile_md: 391,
    // mobile_lg: 499,
    // sm: 560,
    // md: 900,
    // lg: 1200,
    // xl: 1536,
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
    selectedBoxes: {
      ...defaultLetterBoxSx.selectedBoxes,
      ...letterBoxStyles.selectedBoxes,
    },
    foundBoxes: {
      ...defaultLetterBoxSx.foundBoxes,
      ...letterBoxStyles.foundBoxes,
    },
    hover: {
      ...defaultLetterBoxSx.hover,
      ...letterBoxStyles.hover,
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
      letterBox: {
        main: customColors.letterBox.background,
        color: customColors.letterBox.color,
        borderColor: customColors.letterBox.borderColor,
      },
      wordList: {
        main: customColors.wordList.background,
        color: customColors.wordList.color,
      },
      foundWord: {
        main: customColors.foundWord.background,
        color: customColors.foundWord.color,
        borderColor: customColors.foundWord.borderColor,
      },
      fail: {
        main: customColors.fail.background,
        color: customColors.fail.color,
        borderColor: customColors.fail.borderColor,
      },
      typography: {
        hover: {
          color: "Red",
        },
      },
    },

    breakpoints: breakpoints,
  });

  return (
    // <wordsListContext.Provider value={gameDispatch}>
    <ThemeProvider theme={theme}>
      <letterBoxContext.Provider value={letterBoxSx}>
        {children}
      </letterBoxContext.Provider>
    </ThemeProvider>
  );
}

export default StylesProvider;
