import { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import { generatePuzzle } from "./functions/generatePuzzle";
import WordSearchProvider from "./Context/WordSearchProvider";
import WordList from "./components/WordList";
import StylesProvider from "./Context/StylesProvider";
import { mediaContext } from "./Context/MediaContextProvider";
import { fetchWordsAPI } from "./functions/fetchAPI";
import "./App.css";

const defaultGridSize = { rows: 11, cols: 13 };

const defaultColors = {
  primary: {
    background: "#3F497F",
    color: "#fff",
    hoverBackground: "transparent",
    borderColor: "#3F497F",
  },
  foundWord: { background: "#539165", color: "#fff" },
  fail: { background: "#EB5353", color: "#fff" },
};

function App({
  letterBoxStyles = "",
  puzzleContainerStyles = "",
  wordListStyles = "",
  customColors = defaultColors,
  gridSize = defaultGridSize,
  words = "",
  totalWords = 2,
}) {
  const { landscape, ipad, portrait } = useContext(mediaContext);

  const [puzzle, setPuzzle] = useState();
  const [wordsList, setWordsList] = useState();

  useEffect(() => {
    let loading = true;
    let puzzleWords;
    (async () => {
      const data = await fetchWordsAPI(totalWords);
      if (loading) {
        words === ""
          ? (puzzleWords = handleSetPuzzle(data))
          : (puzzleWords = handleSetPuzzle(words));

        const list = puzzleWords.map(
          eachWord =>
            (eachWord = {
              word: eachWord,
              found: false,
            })
        );
        setWordsList(list);
      }
    })();

    return () => (loading = false);
  }, []);

  const handleSetPuzzle = data => {
    let puzzle = generatePuzzle(data, gridSize);
    setPuzzle(puzzle.completePuzzle);

    if (puzzle.failedWords) {
      const filteredWords = data.filter(
        word => !puzzle.failedWords.includes(word)
      );
      return filteredWords;
    } else return data;
  };

  return (
    <StylesProvider
      letterBoxStyles={letterBoxStyles}
      customColors={customColors}
    >
      <Box
        sx={{
          ...appSx,
          padding: {
            xxs: "1rem",
            xs: "1rem",
            mobile: "1.25rem",
            sm: landscape.galaxy
              ? ".5rem"
              : landscape.mobile
              ? "1rem"
              : "1.25rem",
            md: "1.5rem",
            lg: "2rem",
          },
          gap: ipad
            ? portrait.ipad
              ? "1.5rem"
              : "1rem"
            : landscape.phone
            ? "none"
            : ".5rem",
        }}
      >
        {wordsList && (
          <WordSearchProvider words={wordsList}>
            <Box
              sx={{
                position: "relative",
                width: 1,
                height: ipad
                  ? "60px"
                  : {
                      xxs: "35px",
                      xs: landscape.mobile ? "30px" : "40px",
                      mobile: "40px",
                      sm: landscape.galaxy ? "25px" : "45px",
                    },
              }}
            >
              <Typography
                elevation={10}
                sx={{
                  ...titleSx,

                  fontSize: ipad
                    ? "3rem"
                    : {
                        xxs: "1.15rem",
                        xs: landscape.mobile ? "1.15rem" : "1.5rem",
                        sm: landscape.galaxy ? "1.15rem" : "1.5rem",
                        md: landscape.mobile ? "1.5rem" : "2rem",
                      },
                  // background: {
                  //   xxs: "blue",
                  //   xs: "purple",
                  //   mobile: "orange",
                  //   sm: "yellow",
                  //   md: "green",
                  //   lg: "transparent",
                  // },
                }}
              >
                -- Word Search --
              </Typography>
            </Box>
            <Box
              sx={{
                ...containerSx,
                flexDirection: landscape.phone
                  ? "row"
                  : {
                      xxs: "column",
                      sm: landscape.duo ? "row" : "column",
                      md: portrait.ipad ? "column" : "row",
                    },
              }}
            >
              <PuzzleContainer
                completePuzzle={puzzle}
                generatePuzzle={handleSetPuzzle}
                puzzleContainerStylesProp={puzzleContainerStyles}
              />
              <WordList wordListStylesProp={wordListStyles} />
            </Box>
          </WordSearchProvider>
        )}
      </Box>
    </StylesProvider>
  );
}

export default App;

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const appSx = {
  ...flexBoxSx,
  flexDirection: "column",
  justifyContent: "flex-start",
  overflow: "hidden",
  width: 1,
  height: "100vh",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  backgroundColor: "primary.dark",
  position: "relative",
};

const containerSx = {
  ...flexBoxSx,
  justifyContent: "space-around",
  width: 1,
  height: 1,
  gap: { xxs: ".5rem", mobile: "1rem", md: "none" },
};

const titleSx = {
  ...flexBoxSx,
  width: 1,
  fontFamily: "'Sigmar', cursive",
  color: "primary.color",
};
