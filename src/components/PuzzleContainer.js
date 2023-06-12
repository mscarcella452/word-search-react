import { useState, useContext } from "react";
import { Box } from "@mui/material";
import LetterBox from "./LetterBox";
import {
  checkEligibile,
  selectBoxes,
  organizeSelectedWord,
  updateWordsList,
} from "../functions/functionHelpers";
import { v4 as uuidv4 } from "uuid";
import { dispatchContext, gameContext } from "../Context/WordSearchProvider";
import { generatePuzzle } from "../functions/generatePuzzle";

function PuzzleContainer({ completePuzzle, puzzleContainerStylesProp }) {
  const game = useContext(gameContext);
  const dispatch = useContext(dispatchContext);
  const [initialBox, setInitialBox] = useState();
  const [currentBox, setCurrentBox] = useState();

  const handleClickLetter = box =>
    !initialBox ? setInitialBox(box) : submitSelectedWord();

  const handleClearInitialBox = () => {
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

  function submitSelectedWord() {
    const updatedWordsList = updateWordsList(
      game.wordsList,
      initialBox,
      completePuzzle
    );

    updatedWordsList &&
      setTimeout(() => {
        dispatch({
          type: "update_WordsList",
          updatedWordsList: updatedWordsList,
        });
      }, 1500);

    handleClearInitialBox();
  }

  return (
    <Box
      onMouseLeave={handleClearInitialBox}
      sx={{
        ...puzzleContainerSx,
        ...puzzleContainerStylesProp,
      }}
    >
      {completePuzzle.map(row => (
        <Box key={uuidv4()} sx={puzzleRowSx}>
          {row.map(box => (
            <LetterBox
              key={uuidv4()}
              box={box}
              initialBox={initialBox}
              highlightBoxes={handleHighlightBoxes}
              clickLetter={handleClickLetter}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default PuzzleContainer;

const puzzleContainerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "fit-content",
  flexDirection: "column",
  backgroundColor: "primary.main",
  // padding === letter box margin
  padding: "3px",
  borderRadius: "5px",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  boxShadow: "1px 1px 3px black",
  zIndex: 5,
};

const puzzleRowSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "fit-content",
  maxWidth: 1,
  maxHeight: 1,
};
