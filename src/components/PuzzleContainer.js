import { useState, useContext } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import LetterBox from "./LetterBox";
import {
  checkEligibile,
  selectBoxes,
  updateWordsList,
} from "../functions/functionHelpers";
import { v4 as uuidv4 } from "uuid";
import { dispatchContext, gameContext } from "../Context/WordSearchProvider";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { mediaContext } from "../Context/MediaContextProvider";

function PuzzleContainer({
  completePuzzle,
  puzzleContainerStylesProp,
  handlePlayAgain,
}) {
  const game = useContext(gameContext);
  const dispatch = useContext(dispatchContext);
  const { landscape, portrait } = useContext(mediaContext);
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

  const PlayAgain = () => {
    handlePlayAgain();
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
  };

  return (
    <Grid
      onMouseLeave={handleClearInitialBox}
      container
      sx={{
        overflow: "scroll",
        height: landscape.phone
          ? 0.95
          : {
              xxs: 0.8,
              mobile: 0.65,
              sm: landscape.duo ? 0.8 : 0.65,
              md: 0.8,
            },
        width: {
          xxs: 1,
          sm: 0.75,
          md: portrait.ipad ? 0.75 : 0.65,
          lg: 0.75,
        },
        maxWidth: landscape.phone
          ? { xxs: "250px", mobile: 0.5 }
          : {
              xxs: "290px",
              xs: 1,
              mobile: "445px",
              sm: landscape.duo ? "375px" : portrait.ipad ? "750px" : "500px",
              md: portrait.ipad ? "750px" : "550px",
              lg: "650px",
            },
        maxHeight: landscape.mobile
          ? { xxs: "245px", sm: 0.95 }
          : {
              xxs: "225px",
              xs: "375px",
              mobile: "500px",
              lg: "600px",
            },
        padding: "3px 3px 3px 3px",
        boxShadow: "1px 1px 5px  black",
        borderRadius: "5px",
        backgroundColor: "primary.light",
      }}
    >
      {completePuzzle.map(row => (
        <Box sx={{ width: 1, display: "flex" }} key={uuidv4()}>
          {row.map(box => (
            <Grid
              xxs={13}
              key={uuidv4()}
              sx={{
                height: 1,
                width: 1,
              }}
            >
              <LetterBox
                box={box}
                clickLetter={handleClickLetter}
                highlightBoxes={handleHighlightBoxes}
                initialBox={initialBox}
              />
            </Grid>
          ))}
        </Box>
      ))}
    </Grid>
  );
}

export default PuzzleContainer;
