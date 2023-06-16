import { useContext } from "react";
import { Box } from "@mui/material";
import { letterBoxContext } from "../Context/StylesProvider";
import { mediaContext } from "../Context/MediaContextProvider";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function LetterBox({ box, clickLetter, highlightBoxes, initialBox }) {
  const letterBoxSx = useContext(letterBoxContext);
  const { mobileLandscape, ipad } = useContext(mediaContext);

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

        fontSize: ipad
          ? "1.5rem"
          : {
              xxs: ".7rem",
              xs: mobileLandscape ? ".85rem" : "1rem",
              mobile: "1.15rem",
              sm: mobileLandscape ? ".9rem" : "1.25rem",
              md: mobileLandscape ? "1rem" : "1.25rem",
              lg: "1.45rem",
            },

        animation: box.fail
          ? "fail 1.5s ease-out"
          : !box.locked && box.found
          ? "found 1.5s ease-out"
          : "none",
        "@keyframes fail": animationSx("fail.main", "fail.color"),
        "@keyframes found": animationSx("foundWord.main", "foundWord.color"),

        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",

        width: 1,
        height: 1,
        // minWidth: "25px",
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
    // border: "2px solid transparent",
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
