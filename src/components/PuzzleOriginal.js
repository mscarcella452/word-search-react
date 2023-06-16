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

function PuzzleContainer({
  completePuzzle,
  puzzleContainerStylesProp,
  handlePlayAgain,
}) {
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
    <Box
      sx={{
        ...puzzleContainerSx,
        ...puzzleContainerStylesProp,
      }}
    >
      <Paper elevation={5} sx={titleContainerSx}>
        <Typography
          sx={{
            fontSize: "inherit",
            // fontWeight: "bold",
            fontFamily: "'Kalam', cursive",
            fontFamily: "'Sigmar', cursive",
            // fontFamily: "'Lalezar', cursive",
            color: "primary.color",
          }}
        >
          -- Word Search --
        </Typography>
        <Button onClick={PlayAgain}>Play Again</Button>
      </Paper>
      <Box onMouseLeave={handleClearInitialBox} sx={boardContainerSx}>
        {/* <Button onClick={handlePlayAgain}>Play Again</Button> */}
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
  borderRadius: "5px",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  boxShadow: "1px 1px 3px black",
  zIndex: 5,
  gap: {
    mobile_xxs: "2.5px",
    mobile_xs: "2.5px",
    mobile_md: "3px",
    mobile_lg: "6px",
  },
  "@media (max-height: 450px)": {
    gap: "3px",
  },
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

const titleContainerSx = {
  width: 1,
  backgroundColor: "primary.main",
  height: {
    mobile_xxs: "25px",
    mobile_xs: "30px",
    mobile_md: "40px",
    mobile_lg: "40px",
    md: "45px",
  },
  fontSize: {
    mobile_xxs: ".9rem",
    mobile_xs: "1rem",
    mobile_md: "1.25rem",
    mobile_lg: "1.5rem",
  },
  "@media (max-height: 450px)": {
    height: "30px",
    fontSize: "1rem",
  },
  "@media (min-width:700px) and (max-width: 800px)": {
    "@media (min-height:500px) and (max-height:740px)": {
      height: "35px",
      fontSize: "1.25rem",
    },
  },

  padding: "3px",
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px 5px 0 0",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/binding-light.png')",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  boxShadow: "1px 1px 2px black",
};

const boardContainerSx = {
  height: 1,
  width: 1,
  // padding === letter box margin
  padding: {
    mobile_xxs: "2px",
    mobile_xs: "1.75px",
    mobile_md: "2px",
    mobile_lg: "2.5px",
    sm: "3px",
    md: "3.25px",
    lg: "3.5px",
  },
  "@media (max-height: 350px)": {
    padding: "2px",
  },
  "@media (min-width:400px)": {
    "@media (min-height:351px) and (max-height: 374px)": {
      padding: "2.5px",
    },
    "@media (min-height:375px) and (max-height: 412px)": {
      padding: "3px",
    },
    "@media (min-height:413px) and (max-height:450px)": {
      padding: "3px",
    },
  },
};
