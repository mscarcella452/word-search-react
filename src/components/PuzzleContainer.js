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

    puzzle[currentRow].map(box =>
      (box.col >= currentCol && box.col <= initialCol) ||
      (box.col <= currentCol && box.col >= initialCol)
        ? (box.selected = true)
        : (box.selected = false)
    );
    if (currentRow === initialRow || currentCol === initialCol) {
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

function checkEligibile(currentBox, initialBox, puzzle) {
  const length = puzzle[0].length;
  const height = puzzle.length;
  const matrix = [
    {
      // direction: horizontal,
      row: { min: initialBox.row, max: initialBox.row },
      col: { min: 0, max: length - 1 },
    },
    {
      // direction: vertical,
      row: { min: 0, max: height - 1 },
      col: { min: initialBox.col, max: initialBox.col },
    },
  ];

  if (currentBox.row === initialBox.row || currentBox.col === initialBox.col) {
    for (let option of matrix) {
      if (
        currentBox.row >= option.row.min &&
        currentBox.row <= option.row.max &&
        currentBox.col >= option.col.min &&
        currentBox.col <= option.col.max
      ) {
        return true;
      }
    }
  }

  const diagonalMatrix =
    // {
    //   name: "top right",
    //   row: { min: 0, max: initialBox.row - 1 },
    //   col: { min: initialBox.col + 1, max: initialBox.row + initialBox.col },
    //   third:
    //     currentBox.row + currentBox.col === initialBox.row + initialBox.col,
    // },
    // {
    //   name: "bottom right",
    //   row: { min: initialBox.row + 1, max: height - 1 },
    //   col: { min: initialBox.col + 1, max: length - 1 },
    //   third:
    //     currentBox.row - currentBox.col === initialBox.row - initialBox.col,
    // },
    // {
    //   name: "top left",
    //   row: { min: initialBox.row - initialBox.col, max: initialBox.row - 1 },
    //   col: { min: 0, max: initialBox.col - 1 },
    //   third:
    //     currentBox.row - currentBox.col === initialBox.row - initialBox.col,
    // },
    // {
    //   name: "bottom left",
    //   row: {
    //     min: initialBox.row + 1,
    //     max: initialBox.row + initialBox.col,
    //   },
    //   col: { min: 0, max: initialBox.col - 1 },
    //   third:
    //     currentBox.row + currentBox.col === initialBox.row + initialBox.col,
    // },
    {
      name: "topleft to bottomright",
      row: {
        min: initialBox.row - initialBox.col,
        max: initialBox.row + (currentBox.row - initialBox.row),
      },
      col: { min: 0, max: initialBox.col + (currentBox.col - initialBox.col) },
      third:
        currentBox.row + currentBox.col === initialBox.row + initialBox.col ||
        currentBox.row - currentBox.col === initialBox.row - initialBox.col,
    };

  function withinRange(min, max, number) {
    return number >= min && number <= max ? true : false;
  }

  if (
    withinRange(
      diagonalMatrix.row.min,
      diagonalMatrix.row.max,
      currentBox.row
    ) &&
    withinRange(
      diagonalMatrix.col.min,
      diagonalMatrix.col.max,
      currentBox.col
    ) &&
    diagonalMatrix.third
  ) {
    console.log(diagonalMatrix.name);
    return true;
  }
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
      eligible ? eligibleBoxes(box) : notEligibleBoxes();
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
