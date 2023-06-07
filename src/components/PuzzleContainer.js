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

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function PuzzleContainer({ completePuzzle }) {
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
    // let selectedWord = organizeSelectedWord(initialBox, completePuzzle);

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
        ...flexBoxSx,
        width: "fit-content",
        height: "fit-content",
        flexDirection: "column",
        backgroundColor: "teal",
        // padding === letter box margin
        padding: "3px",
        borderRadius: "0 0 5px 5px",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
      }}
    >
      {completePuzzle.map(row => (
        <Box
          key={uuidv4()}
          sx={{
            ...flexBoxSx,
            width: "fit-content",
            height: "fit-content",
            maxWidth: 1,
            maxHeight: 1,
          }}
        >
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
