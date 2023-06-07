import { useState, useEffect, useRef } from "react";
import { useToggle } from "./customHooks";
import { Box, Typography } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import { generatePuzzle, organizeWordsList } from "./functions/generatePuzzle";
import WordSearchProvider from "./Context/WordSearchProvider";
import WordList from "./components/WordList";

import StylesProvider from "./Context/StylesProvider";
import "./App.css";

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
  words = defaultWords,
}) {
  const completePuzzle = generatePuzzle(words, gridSize);

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
        <WordSearchProvider words={words}>
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
              completePuzzle={completePuzzle}
              puzzleContainerStylesProp={puzzleContainerStyles}
            />
            <WordList wordListStylesProp={wordListStyles} />
          </Box>
        </WordSearchProvider>
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
