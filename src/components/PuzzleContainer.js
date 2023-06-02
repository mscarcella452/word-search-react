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

function selectBoxes(initialBox, currentBox, puzzle) {
  if (initialBox && currentBox) {
    const currentRow = currentBox.row;
    const currentCol = currentBox.col;
    const initialRow = initialBox.row;
    const initialCol = initialBox.col;

    const length = puzzle[currentCol].length;
    const height = puzzle.length;

    if (currentRow === initialRow) {
      console.log("hey");
      puzzle[currentRow].map(box =>
        (box.col >= currentCol && box.col <= initialCol) ||
        (box.col <= currentCol && box.col >= initialCol)
          ? (box.selected = true)
          : (box.selected = false)
      );
    }
    if (currentCol === initialCol) {
      for (var i = 0; i < height; i++) {
        let box = puzzle[i][initialCol];

        if (
          (box.row >= currentRow && box.row <= initialRow) ||
          (box.row <= currentRow && box.row >= initialRow)
        ) {
          puzzle[i][initialCol].selected = true;
        } else puzzle[i][initialCol].selected = false;
      }
    }

    // if (currentRow === initialRow) {
    //   puzzle[currentRow].map(box =>
    //     (box.col >= currentCol && box.col <= initialCol) ||
    //     (box.col <= currentCol && box.col >= initialCol)
    //       ? (box.selected = true)
    //       : (box.selected = false)
    //   );
    // }
    // if (currentCol === initialCol) {
    //   for (var i = 0; i < height; i++) {
    //     let box = puzzle[i][initialCol];

    //     if (
    //       (box.row >= currentRow && box.row <= initialRow) ||
    //       (box.row <= currentRow && box.row >= initialRow)
    //     ) {
    //       puzzle[i][initialCol].selected = true;
    //     } else puzzle[i][initialCol].selected = false;
    //   }
    // }
  }
}

function withinRange(min, max, number) {
  return number >= min && number <= max ? true : false;
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

  function handleInitialBox(box) {
    setInitialBox(box);
    box.selected = true;
  }

  function handleHighlightBoxes(box) {
    if (initialBox) {
      let eligible = checkEligibile(box, initialBox, completePuzzle);
      if (eligible) {
        setCurrentBox(box);
        box.selected = true;
      }
      // eligible ? eligibleBoxes(box) : notEligibleBoxes();
    }
  }
  function eligibleBoxes(box) {
    setCurrentBox(box);

    selectBoxes(initialBox, box, completePuzzle);
  }
  function notEligibleBoxes() {
    if (currentBox) {
      setCurrentBox("");
      completePuzzle.map(row =>
        row.map(box => (box !== initialBox ? (box.selected = false) : null))
      );
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
      {completePuzzle.map((row, rowIndex) => (
        <Box
          key={uuidv4()}
          sx={{
            ...flexBoxSx,
            width: "fit-content",
            height: "fit-content",
          }}
        >
          {row.map((box, columnIndex) => (
            <LetterBox
              key={uuidv4()}
              box={box}
              // select={() => selectBoxes(initialBox, currentBox, completePuzzle)}
              grid={completePuzzle}
              setWord={setWord}
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
