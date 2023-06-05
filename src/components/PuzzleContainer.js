import { useState, useEffect, useRef, useContext } from "react";
import { useToggle } from "../customHooks";
import { Box, Typography, keyframes } from "@mui/material";
import LetterBox from "./LetterBox";
import generatePuzzle from "./functionHelpers";
import { v4 as uuidv4 } from "uuid";
import WordList from "./WordList";
import { dispatchContext, gameContext } from "../Context/WordSearchProvider";

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

function PuzzleContainer({ completePuzzle, setCurrentWord }) {
  const dispatch = useContext(dispatchContext);
  const [word, setWord] = useState([]);
  const [initialBox, setInitialBox] = useState();
  const [currentBox, setCurrentBox] = useState();

  const handleClickLetter = box =>
    !initialBox ? setInitialBox(box) : setFoundWord();

  const handleReset = () => {
    if (initialBox) {
      setInitialBox();
      completePuzzle.map(row =>
        row.map(box => (box.selected === true ? (box.selected = false) : null))
      );
    }
  };

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

  function setFoundWord() {
    // dispatch({ type: "selected_word", selected: "" });
    let selectedBoxes = [];

    completePuzzle.map(row =>
      row.map(box => {
        if (box.selected === true) {
          selectedBoxes.push(box);
        }
      })
    );

    const sameRow = initialBox.row === selectedBoxes[1].row;
    const sameCol = initialBox.col === selectedBoxes[1].col;
    const initialColLess = initialBox.col < selectedBoxes[1].col;
    const initialColMore = initialBox.col > selectedBoxes[1].col;
    const initialRowLess = initialBox.row < selectedBoxes[1].row;
    let direction;
    // SET DIRECTION OF WORD
    if (sameRow) {
      direction = initialColLess ? "right" : "left";
    } else if (sameCol) {
      direction = initialRowLess ? "down" : "up";
    } else if (initialColMore) {
      direction = initialRowLess ? "downLeft" : "upLeft";
    } else if (initialColLess) {
      direction = initialRowLess ? "downRight" : "upRight";
    }

    // REORDER DIRECTION OF ARRAY SO INITIAL LETTER IS FIRST
    const reorderDirection = ["left", "up", "upLeft", "upRight"];

    reorderDirection.forEach(option => {
      direction === option && selectedBoxes.reverse();
    });

    // turn selectedBoxes array into selected word string
    let selectedWord = "";
    selectedBoxes.map(box => (selectedWord += box.letter));

    dispatch({
      type: "selected_word",
      word: selectedWord,
      boxes: selectedBoxes,
    });
    handleReset();
  }

  return (
    <Box
      onMouseLeave={handleReset}
      sx={{
        ...flexBoxSx,
        width: "fit-content",
        height: "fit-content",
        flexDirection: "column",
        border: "1px solid blue",
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
              initialBox={initialBox}
              highlightBoxes={handleHighlightBoxes}
              handleClickLetter={handleClickLetter}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default PuzzleContainer;
