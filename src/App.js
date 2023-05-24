import { useState, useEffect, useRef } from "react";
import { useToggle } from "./customHooks";
import { Box, Typography } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import "./App.css";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: 1,
  background: "blue",
};

const wordsList = [
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

const gridSize = { rows: 15, columns: 8 };

function App() {
  return (
    <Box sx={flexBoxSx}>
      <PuzzleContainer wordsList={wordsList} gridSize={gridSize} />
    </Box>
  );
}

export default App;
