import { useState, useEffect, useRef, useContext } from "react";
import { useToggle } from "../customHooks";
import { Box, TextareaAutosize, Typography } from "@mui/material";
import { words, matrix } from "./data";
import { keyframes } from "@mui/material";
import { dispatchContext, gameContext } from "../Context/WordSearchProvider";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function LetterBox({
  grid,
  box,
  handleClickLetter,
  highlightBoxes,
  initialBox,
}) {
  const game = useContext(gameContext);
  const dispatch = useContext(dispatchContext);
  const [selected, setSelected] = useState(box.selected);
  const [found, setFound] = useState(box.found);

  // useEffect(() => {
  //   selected ? selectWord(children, index) : unselectWord(children, index);
  // }, [selected]);

  function handleMouseOver() {
    // if (game.box1) {
    //   // toggleSelected();
    //   // box.selected = true;
    //   dispatch({ type: "direction", box2: box });
    //   /* dispatch({ type: "selected_letters", letter: letter }); */
    // }
    // setCurrentBox(box);
    highlightBoxes(box);
    // select();
    // setSelected(state);
  }
  function handleClick() {
    handleClickLetter(box);
  }

  function checkWord() {
    let checkWord = "";
    grid.map(row => row.map(box => box.selected && (checkWord += box.letter)));

    dispatch({ type: "submit-word", word: checkWord });
  }

  return (
    <Box
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      // onMouseUp={handleMouseUp}
      sx={{
        ...flexBoxSx,
        border: "1px solid black",
        padding: ".5rem",
        width: "70px",
        // width: "40px",
        height: "40px",
        fontSize: "1.25rem",
        // fontSize: "1.5rem",
        cursor: "pointer",
        position: "relative",
        zIndex: 2,
        backgroundColor: selected ? "teal" : found ? "red" : "transparent",

        "&:hover": {
          backgroundColor: !initialBox && !found && "teal",
        },

        "&::before": {
          content: '""',

          backgroundImage:
            selected &&
            "url('https://www.transparenttextures.com/patterns/noise-lines.png')",

          position: "absolute",
          width: "100%",
          height: selected ? "100%" : 0,
          /* height: locked ? .5 : 1, */
          transition: "all 1s ease",
          /* overflow: "hidden", */
          // transform: !selected
          //   ? "skew(-10deg) translateX(-100%)"
          //   : "skew(0) translateX(0)",

          /* animation: selected && `${bounce} 1s ease`, */
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1,
          "@keyframes createBox": {
            "0%": {
              opacity: 0,
              transform: "translateY(-200%)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        },
      }}
    >
      {box.letter}
    </Box>
  );
}

export default LetterBox;
