// import { useState, useEffect, useRef, useContext } from "react";
import { Box } from "@mui/material";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function LetterBox({ box, clickLetter, highlightBoxes, initialBox }) {
  // const [selected, setSelected] = useState(box.selected);
  // const [fail, setFail] = useState(box.fail);
  // const [found, setFound] = useState(box.found);
  // const [locked, setLocked] = useState(box.locked);

  const handleMouseOver = () => highlightBoxes(box);

  const handleClick = () => clickLetter(box);

  return (
    <Box
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      sx={{
        ...flexBoxSx,
        borderRadius: "5px",
        margin: ".25rem",
        width: "50px",
        height: "50px",
        fontSize: "1.25rem",
        cursor: "pointer",
        position: "relative",
        zIndex: 2,
        border: box.selected
          ? "2px solid teal"
          : box.found
          ? "1px solid white"
          : "none",
        color: box.selected || box.found ? "white" : "black",
        backgroundColor: box.selected
          ? "transparent"
          : box.found
          ? "green"
          : "white",
        fontWeight: box.found || (box.selected && "bold"),
        // textDecoration: fail && "line-through",
        backgroundImage:
          box.found &&
          "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
        "&:hover": {
          transition: "all .1s ease",
          color: !initialBox && "white",
          backgroundColor: !initialBox && "transparent",
          fontWeight: !initialBox && "bold",
          border: !initialBox && "2px solid teal",
        },

        transition: "all .5s ease",
        animation: box.fail
          ? "fail 1.5s ease-in"
          : !box.locked && box.found
          ? "found 1.5s ease-in"
          : "none",
        "@keyframes fail": animationSx("red"),
        "@keyframes found": animationSx("green"),
      }}
    >
      {box.letter}
    </Box>
  );
}

const keyFramesSx = {
  default: {
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
    fontWeight: "bold",
    color: "white",
    border: "2px solid transparent",
    borderRadius: "50%",
    zIndex: 10,
    backgroundColor: "transparent",
  },
  transform: {
    start: "translate(-5px, 0)",
    quarter: "translate(0, -5px)",
    half: "translate(5px, 0)",
    threeFourth: "translate(0, 5px)",
    end: "translate(0)",
  },
};

function animationSx(color) {
  return {
    "0%": {
      ...keyFramesSx.default,
      transform: keyFramesSx.transform.start,
    },

    "25%": {
      transform: keyFramesSx.transform.quarter,
    },
    "50%": {
      transform: keyFramesSx.transform.half,
      backgroundColor: color,
    },
    "75%": {
      ...keyFramesSx.default,
      transform: keyFramesSx.transform.threeFourth,
      backgroundColor: color,
    },

    "100%": {
      transform: keyFramesSx.transform.end,
    },
  };
}

export default LetterBox;
