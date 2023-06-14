import { useContext } from "react";
import { Box } from "@mui/material";
import { letterBoxContext } from "../Context/StylesProvider";

function LetterBox({ box, clickLetter, highlightBoxes, initialBox }) {
  const letterBoxSx = useContext(letterBoxContext);

  const handleMouseOver = () => highlightBoxes(box);

  const handleClick = () => clickLetter(box);

  return (
    <Box
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      sx={{
        ...letterBoxSx.unselectedBoxes,
        ...(box.selected && letterBoxSx.selectedBoxes),
        ...(box.found && letterBoxSx.foundBoxes),
        "&:hover": {
          ...(!initialBox && letterBoxSx.hover),
        },

        // background: {
        //   mobile_xxs: "blue",
        //   mobile_xs: "green",
        //   mobile_md: "red",
        //   mobile_lg: "puple",
        //   sm: "yellow",
        //   md: "teal",
        //   lg: "brown",
        // },

        animation: box.fail
          ? "fail 1.5s ease-out"
          : !box.locked && box.found
          ? "found 1.5s ease-out"
          : "none",
        "@keyframes fail": animationSx("fail.main", "fail.color"),
        "@keyframes found": animationSx("foundWord.main", "foundWord.color"),
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
    // borderRadius: "50%",
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

function animationSx(background, fontColor) {
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
      backgroundColor: background,
      color: fontColor,
    },
    "75%": {
      ...keyFramesSx.default,
      transform: keyFramesSx.transform.threeFourth,
      backgroundColor: background,
      color: fontColor,
    },

    "100%": {
      transform: keyFramesSx.transform.end,
    },
  };
}

export default LetterBox;
