import { useState, useEffect, useRef } from "react";
import { useToggle } from "./customHooks";
import { Box, Typography } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import { generatePuzzle, organizeWordsList } from "./functions/generatePuzzle";
import WordSearchProvider from "./Context/WordSearchProvider";
import WordList from "./components/WordList";
import "./App.css";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: 1,
  height: 1,
};

const words = [
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

const gridSize = { rows: 10, columns: 14 };

function App() {
  const completePuzzle = generatePuzzle(words, gridSize);

  return (
    <Box sx={flexBoxSx}>
      <WordSearchProvider words={words}>
        <WordList />
        <PuzzleContainer completePuzzle={completePuzzle} />
      </WordSearchProvider>
    </Box>
  );
}

export default App;
