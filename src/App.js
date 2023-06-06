import { useState, useEffect, useRef } from "react";
import { useToggle } from "./customHooks";
import { Box, Typography } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import generatePuzzle from "./functions/generatePuzzle";
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

const gridSize = { rows: 15, columns: 10 };

function App() {
  const [currentWord, setCurrentWord] = useState([]);
  const [foundWords, setFoundWords] = useState([]);

  const wordsList = words.map(
    eachWord =>
      (eachWord = {
        word: eachWord,
        found: false,
      })
  );

  const completePuzzle = generatePuzzle(wordsList, gridSize);
  return (
    <Box sx={flexBoxSx}>
      <WordSearchProvider>
        <WordList wordsList={wordsList} />
        <PuzzleContainer
          completePuzzle={completePuzzle}
          setCurrentWord={setCurrentWord}
        />
      </WordSearchProvider>
    </Box>
  );
}

export default App;
