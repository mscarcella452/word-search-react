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
  gridSize,
}) {
  const game = useContext(gameContext);
  const dispatch = useContext(dispatchContext);
  const { mobileLandscape, ipad } = useContext(mediaContext);
  const [initialBox, setInitialBox] = useState();
  const [currentBox, setCurrentBox] = useState();

  const { rows, cols } = gridSize;

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
      container
      sx={{
        // background: {
        //   xxs: "blue",
        //   xs: "purple",
        //   mobile: "orange",
        //   sm: "yellow",
        //   md: "green",
        //   lg: "white",
        // },
        height: mobileLandscape ? 0.98 : { xxs: 0.8, mobile: 0.65, md: 0.8 },
        width: { xxs: 1, sm: 0.75, md: 0.65, lg: 0.75 },
        maxWidth: mobileLandscape
          ? { xxs: "250px", mobile: 0.5 }
          : { xxs: "290px", xs: 1, mobile: "500px", md: "550px", lg: "650px" },
        maxHeight: mobileLandscape
          ? { xxs: "245px", sm: 0.9 }
          : { xxs: "225px", xs: "375px", mobile: "500px", lg: "600px" },
        // height: ipad
        //   ? {
        //       xxs: "275px",
        //       xs: "375px",
        //       mobile: "400px",
        //       sm: "500px",
        //       md: "625px",
        //       lg: "700px",
        //       xl: "700px",
        //     }
        //   : mobileLandscape
        //   ? {
        //       xxs: "275px",
        //       xs: "245px",
        //       mobile: "400px",
        //       sm: "285px",
        //       md: "330px",
        //     }
        //   : {
        //       xxs: "275px",
        //       xs: "375px",
        //       mobile: "400px",
        //       sm: "430px",
        //       md: "475px",
        //       lg: "550px",
        //       xl: "700px",
        //     },
        // width: ipad
        //   ? {
        //       xxs: "275px",
        //       xs: "375px",
        //       mobile: "400px",
        //       sm: "700px",
        //       md: "650px",
        //       lg: "750px",
        //       xl: "700px",
        //     }
        //   : mobileLandscape
        //   ? {
        //       xxs: "275px",
        //       xs: "280px",
        //       mobile: "400px",
        //       sm: "400px",
        //       md: "450px",
        //     }
        //   : {
        //       xxs: "275px",
        //       xs: "375px",
        //       mobile: "500px",
        //       sm: "500px",
        //       md: "525px",
        //       lg: "650px",
        //       xl: "700px",
        //     },

        // maxHeight: 1,
        // maxWidth: 1,
        padding: "3px 3px 3px 3px",
        boxShadow: "1px 1px 5px  black",
        borderRadius: "5px",
        backgroundColor: "primary.light",
        // boxShadow: "1px 1px 5px inset black, -1px -1px 5px inset black",
      }}
      // spacing={{ xs: 2, md: 3 }}
      // columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {completePuzzle.map(row => (
        <Box sx={{ width: 1, display: "flex" }}>
          {row.map(box => (
            <Grid
              // item
              xxs={13}
              key={uuidv4()}
              sx={{
                height: 1,
                width: 1,
              }}
            >
              {/* <Box sx={{ width: 1, height: 1 }}>{box.letter}</Box> */}
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

const puzzleContainerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  height: "fit-content",
  flexDirection: "column",
  // backgroundColor: "primary.main",
  borderRadius: "5px",
  // backgroundImage:
  //   "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
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
  backgroundColor: "transparent",
  height: "35px",
  fontSize: {
    mobile_xxs: ".9rem",
    mobile_xs: "1rem",
    mobile_md: "1.25rem",
    mobile_lg: "2rem",
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
  // paddingBottom: "1rem",
  textTransform: "uppercase",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px 5px 0 0",
  // backgroundImage:
  //   "url('https://www.transparenttextures.com/patterns/binding-light.png')",
  // backgroundImage:
  //   "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  boxShadow: "1px 1px 2px black",
  zIndex: 10,
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

//  height: {
//           xxs: `calc((${rows} * 20px) + 100px)`,
//           xs: `calc((${rows} * 30px) + 39px)`,
//           mobile: `calc((${rows} * 35px) + 39px)`,
//           sm: `calc((${rows} * 35px) + 39px)`,
//           md: `calc((${rows} * 40px) + 39px)`,
//           lg: `calc((${rows} * 50px) + 39px)`,
//         },
//         width: {
//           xxs: `calc((${cols} * 20px) + 4px)`,
//           xs: `calc((${cols} * 30px) + 4px)`,
//           mobile: `calc((${cols} * 35px) + 4px)`,
//           sm: `calc((${cols} * 35px) + 4px)`,
//           md: `calc((${cols} * 40px) + 4px)`,
//           lg: `calc((${cols} * 50px) + 4px)`,
//         },
