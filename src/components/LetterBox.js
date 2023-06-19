import { useContext } from "react";
// material ui
import { Box } from "@mui/material";
// context
import { mediaContext } from "../Context/MediaContextProvider";

function LetterBox({ box, clickLetter, highlightBoxes, initialBox }) {
  const { landscape, ipad } = useContext(mediaContext);

  const handleMouseOver = () => highlightBoxes(box);

  const handleClick = () => clickLetter(box);

  return (
    <Box
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      sx={{
        ...letterBoxSx.unselectedBoxes,
        ...(box.selected && letterBoxSx.highlightedBoxes),
        ...(box.found && letterBoxSx.foundBoxes),
        "&:hover": {
          ...(!initialBox && letterBoxSx.highlightedBoxes),
        },

        fontSize: ipad
          ? "1.5rem"
          : {
              xxs: ".7rem",
              xs: "1rem",
              mobile: "1.15rem",
              sm: landscape.galaxy ? ".8rem" : "1.15rem",
              md: "1.25rem",
              lg: "1.45rem",
            },

        fontSize: ipad
          ? "1.5rem"
          : {
              xxs: ".7rem",
              xs: landscape.mobile ? ".85rem" : "1rem",
              mobile: "1.15rem",
              sm: landscape.mobile
                ? ".95rem"
                : landscape.galaxy
                ? ".8rem"
                : "1.15rem",
              md: landscape.mobile ? "1rem" : "1.25rem",
              lg: "1.45rem",
            },

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
    color: "white",
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
export default LetterBox;

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

const letterBoxSx = {
  unselectedBoxes: {
    width: 1,
    height: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: ".5px -.5px 2px inset black",
    borderRadius: "2.5px",
    cursor: "pointer",
    color: "primary.color",
    backgroundColor: "primary.main",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
    fontFamily: "'Lalezar', cursive",
    textTransform: "lowercase",
  },

  foundBoxes: {
    color: "foundWord.color",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
    backgroundColor: "foundWord.main",
  },

  highlightedBoxes: {
    color: "primary.color",
    backgroundColor: "primary.dark",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  },
};
