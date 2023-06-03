import { useState, useEffect, useRef, useContext } from "react";
import { useToggle } from "../customHooks";
import { Box, Typography, keyframes } from "@mui/material";
import LetterBox from "./LetterBox";
import generatePuzzle from "./functionHelpers";
import { v4 as uuidv4 } from "uuid";
import WordList from "./WordList";
import WordSearchProvider from "../Context/WordSearchProvider";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function withinRange(min, max, number) {
  return number >= min && number <= max ? true : false;
}

function checkDiagonal(initial, current, box) {
  const diagonalOptions = [
    {
      // name: "topLeft",
      row: { min: current.row, max: initial.row },
      col: { min: current.col, max: initial.col },
    },
    {
      // name: "topRight",
      row: { min: current.row, max: initial.row },
      col: { min: initial.col, max: current.col },
    },
    {
      // name: "bottomLeft",
      row: { min: initial.row, max: current.row },
      col: { min: current.col, max: initial.col },
    },
    {
      // name: "bottomRight",
      row: { min: initial.row, max: current.row },
      col: { min: initial.col, max: current.col },
    },
  ];

  for (let option of diagonalOptions) {
    if (
      withinRange(option.row.min, option.row.max, box.row) &&
      withinRange(option.col.min, option.col.max, box.col)
    ) {
      return true;
    }
  }
}

function selectBoxes(initial, current, puzzle) {
  if (initial && current) {
    puzzle.map(row =>
      row.map(box =>
        checkDiagonal(initial, current, box) &&
        (box.row + box.col === initial.row + initial.col ||
          box.row - box.col === initial.row - initial.col)
          ? (box.selected = true)
          : (box.selected = false)
      )
    );

    // ------------------

    if (current.row === initial.row) {
      puzzle[current.row].map(box =>
        (box.col >= current.col && box.col <= initial.col) ||
        (box.col <= current.col && box.col >= initial.col)
          ? (box.selected = true)
          : (box.selected = false)
      );
    }
    // ------------------
    if (current.col === initial.col) {
      for (var i = 0; i < puzzle.length; i++) {
        let box = puzzle[i][initial.col];

        (box.row >= current.row && box.row <= initial.row) ||
        (box.row <= current.row && box.row >= initial.row)
          ? (box.selected = true)
          : (box.selected = false);
      }
    }
  }
}

function checkEligibile(current, initial, puzzle) {
  const length = puzzle[0].length;
  const height = puzzle.length;

  const horizontal =
    current.row === initial.row && withinRange(0, length - 1, current.col);

  const vertical =
    current.col === initial.col && withinRange(0, height - 1, current.row);

  const diagonal =
    current.row + current.col === initial.row + initial.col ||
    current.row - current.col === initial.row - initial.col;

  return horizontal || vertical || diagonal ? true : false;
}

function PuzzleContainer({ completePuzzle, wordsList }) {
  const [word, setWord] = useState([]);
  const [initialBox, setInitialBox] = useState();
  const [currentBox, setCurrentBox] = useState();

  const handleInitialBox = box => setInitialBox(box);

  const handleHighlightBoxes = box => initialBox && highlight(box);

  function highlight(box) {
    let eligible = checkEligibile(box, initialBox, completePuzzle);
    if (eligible) {
      setCurrentBox(box);
      selectBoxes(initialBox, box, completePuzzle);
    } else {
      if (currentBox) {
        setTimeout(() => setCurrentBox(""), 100);
        completePuzzle.map(row =>
          row.map(box => (box !== initialBox ? (box.selected = false) : null))
        );
      }
    }
  }

  return (
    <Box
      sx={{
        ...flexBoxSx,
        flexDirection: "column",
        // gap: "1rem",
        // marginTop: "5rem",
      }}
    >
      {completePuzzle.map(row => (
        <Box
          key={uuidv4()}
          sx={{
            ...flexBoxSx,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          {row.map(box => (
            <LetterBox
              key={uuidv4()}
              box={box}
              setInitialBox={handleInitialBox}
              highlightBoxes={handleHighlightBoxes}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default PuzzleContainer;
