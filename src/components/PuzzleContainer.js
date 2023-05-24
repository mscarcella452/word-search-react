import { useState, useEffect, useRef } from "react";
import { useToggle } from "../customHooks";
import { Box, Typography } from "@mui/material";
import LetterBox from "./LetterBox";
import generatePuzzle from "./functionHelpers";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function PuzzleContainer({ wordsList, gridSize }) {
  // const [word, setWord] = useState([]);
  const [currentIndex, setCurrentIndex] = useState({ x: "", y: "" });

  const completePuzzle = generatePuzzle(wordsList, gridSize);

  return (
    <Box
      sx={{
        ...flexBoxSx,
        flexDirection: "column",
        // gap: "1rem",
        background: "green",
        marginTop: "5rem",
      }}
    >
      {completePuzzle.map((row, columnIndex) => (
        <Box
          sx={{
            ...flexBoxSx,
            background: "blue",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          {row.map((letter, rowIndex) => (
            <Box
              sx={{
                ...flexBoxSx,
                background: "teal",
                width: "70px",
                height: "30px",
                border: "1px solid black",
                padding: "1rem .75rem",
              }}
            >
              {letter}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default PuzzleContainer;
