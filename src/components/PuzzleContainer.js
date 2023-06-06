import { useState, useContext } from "react";
import { Box, Typography, keyframes } from "@mui/material";
import LetterBox from "./LetterBox";
import {
  checkEligibile,
  selectBoxes,
  organizeSelectedWord,
} from "../functions/functionHelpers";
import { v4 as uuidv4 } from "uuid";
import { dispatchContext, gameContext } from "../Context/WordSearchProvider";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function PuzzleContainer({ completePuzzle }) {
  const dispatch = useContext(dispatchContext);
  const [initialBox, setInitialBox] = useState();
  const [currentBox, setCurrentBox] = useState();

  const handleClickLetter = box =>
    !initialBox ? setInitialBox(box) : submitSelectedWord();

  const clearInitialBox = () => {
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
    let selectedWord = organizeSelectedWord(initialBox, completePuzzle);

    dispatch({
      type: "selected_word",
      word: selectedWord.word,
      boxes: selectedWord.selectedBoxes,
    });
    clearInitialBox();
  }

  return (
    <Box
      onMouseLeave={clearInitialBox}
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
