import { useState, useEffect, useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
// material ui
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
// context
import { dispatchContext, gameContext } from "../Context/WordSearchProvider";
import { mediaContext } from "../Context/MediaContextProvider";
// functions
import {
  checkEligibile,
  selectBoxes,
  updateWordsList,
} from "../functions/functionHelpers";
import { fetchWordsAPI } from "../functions/fetchAPI";
// components
import LetterBox from "./LetterBox";

function PuzzleContainer({
  completePuzzle,
  puzzleContainerStylesProp,
  generatePuzzle,
}) {
  // context
  const game = useContext(gameContext);
  const dispatch = useContext(dispatchContext);
  const { landscape, portrait, ipad } = useContext(mediaContext);
  // state
  const [initialBox, setInitialBox] = useState();
  const [currentBox, setCurrentBox] = useState();
  const [delay, setDelay] = useState(false);
  // ref
  const ref = useRef();

  const gameOver = !game.remaining > 0;

  // ---------------------------------------
  // USE EFFECT: if initial Box selected --> clears Initial Box when mouseleaves the grid
  // ---------------------------------------
  useEffect(() => {
    if (ref.current && initialBox) {
      ref.current.addEventListener("mouseleave", handleClearInitialBox);

      return () => {
        ref.current.removeEventListener("mouseleave", handleClearInitialBox);
      };
    }
  }, [initialBox]);

  // ---------------------------------------
  // HELPER FUNCTIONS
  // ---------------------------------------
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
  // ---------------------------------------
  function submitSelectedWord() {
    const updatedWordsList = updateWordsList(
      game.wordsList,
      initialBox,
      completePuzzle
    );
    // set debounce delay for setting initial box
    setDelay(true);

    setTimeout(() => {
      setDelay(false);
      updatedWordsList &&
        dispatch({
          type: "update_WordsList",
          updatedWordsList: updatedWordsList,
        });
    }, 1500);

    handleClearInitialBox();
  }

  // ---------------------------------------
  // HANDLE FUNCTIONS
  // ---------------------------------------
  const handleClickLetter = box => {
    !gameOver && !initialBox
      ? !delay && setInitialBox(box)
      : submitSelectedWord();
  };
  // ---------------------------------------
  const handleClearInitialBox = () => {
    console.log("clear");
    if (initialBox) {
      setInitialBox();
      completePuzzle.map(row =>
        row.map(box => (box.selected === true ? (box.selected = false) : null))
      );
    }
  };
  // ---------------------------------------
  const handleHighlightBoxes = box => initialBox && highlight(box);
  // ---------------------------------------
  const handlePlayAgain = () => {
    (async () => {
      const data = await fetchWordsAPI(game.wordsList.length);

      const newWords = generatePuzzle(data);
      const wordsList = newWords.map(
        eachWord =>
          (eachWord = {
            word: eachWord,
            found: false,
          })
      );

      dispatch({
        type: "update_WordsList",
        updatedWordsList: wordsList,
        remaining: data.length,
      });
    })();
  };
  // ---------------------------------------

  return (
    <Grid
      ref={ref}
      container
      sx={{
        ...gridContainerSx,
        overflow: !gameOver ? "scroll" : "hidden",
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
      }}
    >
      {gameOver && (
        <Box sx={gameOverContainerSx}>
          <Button
            onClick={handlePlayAgain}
            sx={{ ...playAgainBtnSx, borderRadius: ipad ? "10px" : "5px" }}
          >
            <Typography
              sx={{
                ...playAgainLabelSx,
                fontSize: ipad
                  ? "2rem"
                  : {
                      xxs: "1rem",
                      xs: landscape.mobile ? "1rem" : "1.5rem",
                      mobile: landscape.phone ? "1rem" : "1.5rem",
                      sm: landscape.galaxy
                        ? "1rem"
                        : landscape.mobile || landscape.duo
                        ? "1.25rem"
                        : "1.75rem",
                      md: landscape.mobile ? "1.25rem" : "1.75rem",
                      lg: "1.75rem",
                    },
                padding: ipad
                  ? ".75rem"
                  : {
                      xxs: ".25rem",
                      xs: landscape.mobile ? ".25rem" : ".5rem",
                      mobile: ".5rem",
                      sm: landscape.phone || landscape.duo ? ".25rem" : ".5rem",
                      md: landscape.mobile ? ".5rem" : ".5rem",
                      lg: ".5rem",
                    },
              }}
            >
              Play Again?
            </Typography>
          </Button>
        </Box>
      )}

      {completePuzzle.map(row => (
        <Box sx={{ width: 1, display: "flex" }} key={uuidv4()}>
          {row.map(box => (
            <Grid xxs={13} key={uuidv4()} sx={{ height: 1, width: 1 }}>
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

const flexBoxSx = {
  height: 1,
  width: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const gridContainerSx = {
  padding: "3px",
  boxShadow: "1px 1px 5px  black",
  borderRadius: "5px",
  backgroundColor: "primary.light",
  position: "relative",
};

const gameOverContainerSx = {
  ...flexBoxSx,
  position: "absolute",
  zIndex: 10,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,

  "&::before": {
    content: "''",
    backgroundColor: "primary.dark",
    opacity: 0.75,
    height: 1,
    width: 1,
    zIndex: -10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    position: "absolute",
  },
};

const playAgainBtnSx = {
  backgroundColor: "primary.dark",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  boxShadow: "1px 1px 2px  black",
  "&:hover": {
    backgroundColor: "primary.main",
  },
};

const playAgainLabelSx = {
  ...flexBoxSx,
  fontFamily: "'Sigmar', cursive",
  textTransform: "capitalize",
  color: "primary.color",
};
