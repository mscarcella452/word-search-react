import { useState, useEffect, useContext } from "react";
// materiul ui
import { Box } from "@mui/material";
// context
import StylesProvider from "./Context/StylesProvider";
import { mediaContext } from "./Context/MediaContextProvider";
// functions
import { generatePuzzle } from "./functions/generatePuzzle";
import { fetchWordsAPI } from "./functions/fetchAPI";
// data
import { defaultColors, defaultGridSize } from "./data";
// components
import PuzzleContainer from "./components/PuzzleContainer";
import WordSearchProvider from "./Context/WordSearchProvider";
import WordList from "./components/WordList";
import Title from "./components/Title";

function App({
  letterBoxStyles = "",
  puzzleContainerStyles = "",
  wordListStyles = "",
  customColors = defaultColors,
  gridSize = defaultGridSize,
  words = "",
  totalWords = 12,
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
            // xs: "1rem",
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
            <Title />
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
  overflow: "hidden",
};
