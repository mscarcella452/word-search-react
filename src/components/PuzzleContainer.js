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
  generatePuzzle,
  totalWords,
}) {
  const game = useContext(gameContext);
  const dispatch = useContext(dispatchContext);
  const { landscape, portrait } = useContext(mediaContext);
  const [initialBox, setInitialBox] = useState();
  const [currentBox, setCurrentBox] = useState();

  const handleClickLetter = box => {
    if (game.counter.rem > 0) {
      !initialBox ? setInitialBox(box) : submitSelectedWord();
    }
  };

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

  const handlePlayAgain = () => {
    (async () => {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${totalWords}&length=${5}`
      );
      const data = await response.json();

      const wordsList = data.map(
        eachWord =>
          (eachWord = {
            word: eachWord,
            found: false,
          })
      );

      generatePuzzle(data);

      dispatch({
        type: "update_WordsList",
        updatedWordsList: wordsList,
        rem: data.length,
        total: data.length,
      });
    })();
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
        padding: "3px",
        boxShadow: "1px 1px 5px  black",
        borderRadius: "5px",
        backgroundColor: "primary.light",
        position: "relative",
      }}
    >
      {!game.counter.rem > 0 && (
        <Box
          sx={{
            position: "absolute",
            height: 1,
            width: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,

            "&::before": {
              content: "''",
              backgroundColor: "primary.dark",
              opacity: 0.5,
              height: 1,
              width: 1,
              zIndex: -10,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,

              position: "absolute",
            },
          }}
        >
          <Button
            onClick={handlePlayAgain}
            sx={{
              // height: "100px",
              // width: "fit-content",
              fontSize: { xxs: "1rem", mobile: "1.25rem", md: "1.5rem" },
              padding: "1rem 2rem",
              borderRadius: "5px",
              backgroundColor: "primary.dark",
              color: "primary.color",

              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
              boxShadow: "1px 1px 2px  black",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Sigmar', cursive",
                textTransform: "capitalize",
                height: 1,
                width: 1,
                fontSize: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "primary.color",
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
