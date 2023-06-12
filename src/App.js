import { useState, useEffect, useRef, useCallback } from "react";
import { useToggle } from "./customHooks";
import { Box, Typography } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import { generatePuzzle, organizeWordsList } from "./functions/generatePuzzle";
import WordSearchProvider from "./Context/WordSearchProvider";
import WordList from "./components/WordList";
import StylesProvider from "./Context/StylesProvider";
import "./App.css";

async function fetchWords(total, length) {
  const response = await fetch(
    `https://random-word-api.vercel.app/api?words=${total}&length=${length}`
  );

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let words = await response.json();
    return words;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
let wordsApi = await fetchWords(4, 5);
async function fetchApi() {
  let words1 = await fetchWords(4, 5);
  let words2 = await fetchWords(2, 3);
  let words3 = await fetchWords(3, 6);
  let words4 = await fetchWords(1, 8);

  const results = [...words1, ...words2, ...words3, ...words4];
  return results;
}

const flexBoxSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "column",
  width: 1,
  height: "100vh",
  padding: "1rem",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
};

const defaultWords = [
  "javascript",
  "react",
  "html",
  "css",
  "sass",
  "adobe",
  // "illustrator",
  // "photoshop",
  // "xd",
];

const defaultGridSize = { rows: 12, columns: 20 };

const defaultColors = {
  primary: {
    background: "#187498",
    color: "#fff",
    hoverBackground: "transparent",
    borderColor: "#187498",
  },
  letterBox: { background: "#fff", color: "#000", borderColor: "#fff" },
  wordList: { background: "#187498", color: "#000" },
  foundWord: { background: "#36AE7C", color: "#fff", borderColor: "#36AE7C" },
  fail: { background: "#EB5353", color: "#fff", borderColor: "#EB5353ff" },
};

function App({
  letterBoxStyles = "",
  puzzleContainerStyles = "",
  wordListStyles = "",
  customColors = defaultColors,
  gridSize = defaultGridSize,
  words = "",
  totalWords = 8,
}) {
  const [puzzle, setPuzzle] = useState();
  const [wordsList, setWordsList] = useState();

  useEffect(() => {
    let loading = true;
    (async () => {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${totalWords}&length=${5}`
      );
      const data = await response.json();
      if (loading) {
        let completePuzzle;
        if (words === "") {
          setWordsList(data);
          completePuzzle = generatePuzzle(data, gridSize);
        } else {
          setWordsList(words);
          completePuzzle = generatePuzzle(words, gridSize);
        }
        setPuzzle(completePuzzle);
      }
    })();

    return () => (loading = false);
  }, []);

  return (
    <StylesProvider
      letterBoxStyles={letterBoxStyles}
      customColors={customColors}
    >
      <Box sx={flexBoxSx}>
        {/* <Box sx={titleSx}>
          {title.map(letter => (
            <Typography>{letter}</Typography>
          ))}
        </Box> */}

        {wordsList && (
          <WordSearchProvider words={wordsList}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 1,
                height: 1,
                background: "blue",
                gap: "1rem",
              }}
            >
              <PuzzleContainer
                wordsList={wordsList}
                completePuzzle={puzzle}
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

const titleSx = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: 1,
  height: "fit-content",
  padding: ".5rem 5rem",
  opacity: 0.5,
  fontWeight: "bold",
};

const title = [
  "W",
  "/",
  "O",
  "/",
  "R",
  "/",
  "D",
  "/",
  "S",
  "/",
  "E",
  "/",
  "A",
  "/",
  "R",
  "/",
  "C",
  "/",
  "H",
];
