import { useContext } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { gameContext } from "../Context/WordSearchProvider";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { mediaContext } from "../Context/MediaContextProvider";

function WordList({ wordListStylesProp }) {
  const game = useContext(gameContext);

  const { ipad, landscape, portrait } = useContext(mediaContext);

  return (
    <Box
      sx={{
        ...flexBoxSx,
        ...wordListStylesProp,

        height: 1,
        maxHeight: {
          xxs: landscape.phone || landscape.duo ? 1 : 0.4,
          md: 1,
        },
        width: {
          xxs: landscape.phone || landscape.duo ? 0.5 : 1,
          md: portrait.ipad ? 1 : "400px",
          lg: "500px",
        },
        maxWidth: {
          xxs: landscape.phone ? "350px" : 1,
          sm: landscape.duo ? "275px" : 1,
          md: portrait.ipad ? 1 : 0.35,
          lg: 1,
        },
        overflow: "scroll",

        // background: {
        //   xxs: "blue",
        //   xs: "purple",
        //   mobile: "orange",
        //   sm: "yellow",
        //   md: "green",
        //   lg: "white",
        // },
      }}
    >
      <Grid
        container
        sx={{
          height: 1,

          width: 1,

          ...flexBoxSx,
          justifyContent: "flex-start",
        }}
        spacing={{ xxs: 0.75, sm: 1, md: 1.5 }}
      >
        {game.wordsList.map(word => (
          <Grid
            xxs={3}
            xs={4}
            sm={landscape.mobile ? 4 : landscape.duo ? 6 : 3}
            md={landscape.mobile || portrait.ipad ? 4 : 4}
            lg={4}
            // sx={{
            //   ...flexBoxSx,
            //   background: "Red",

            //   // width: "125px",

            //   // height: "50px",
            // }}
            key={uuidv4()}
          >
            <Box
              sx={{
                ...flexBoxSx,
                width: 1,
                height: 1,
                fontFamily: "'Kalam', cursive",
                fontSize: ipad
                  ? "1.5rem"
                  : {
                      xxs: ".8rem",
                      xs: landscape.mobile ? ".8rem" : "1rem",
                      mobile: "1.1rem",
                      sm: landscape.galaxy ? ".8rem" : "1.1rem",
                      md: landscape.mobile ? "1.1rem" : "1.25rem",
                      lg: "1.35rem",
                    },
                padding: ipad
                  ? ".5rem"
                  : landscape.mobile
                  ? ".25rem"
                  : { xxs: ".25rem", md: ".35rem" },
                // textDecoration: word.found && "line-through",
                backgroundColor: word.found
                  ? "foundWord.main"
                  : "primary.color",
                color: word.found ? "foundWord.color" : "black",
                fontWeight: word.found && "bold",
                // backgroundImage:
                //   "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
                backgroundImage: word.found
                  ? "url('https://www.transparenttextures.com/patterns/noise-lines.png')"
                  : "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",
                // backgroundImage: word.found
                //   ? "url('https://www.transparenttextures.com/patterns/noise-lines.png')"
                //   : "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",

                textTransform: "capitalize",
                border: ".5px solid",
                borderColor: !word.found ? "black" : "foundWord.main",
                borderRadius: word.found ? "5px" : "5px",

                boxShadow: ".5px 1px 1.5px  black",
              }}
            >
              {word.word}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default WordList;

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const wordsListContainerSx = {
  ...flexBoxSx,
  flexDirection: "column",
  // width: 1,
  // padding: { xxs: " .25rem", mobile: " 1rem", md: "1rem 1.5rem" },
  // overflow: "scroll",
};

//  <Typography
//    sx={{
//      ...flexBoxSx,
//      // textDecoration: word.found && "line-through",
//      backgroundColor: word.found ? "foundWord.main" : "white",
//      color: word.found ? "foundWord.color" : "fail.dark",
//      fontWeight: word.found && "bold",
//      backgroundImage:
//        "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
//      backgroundImage: word.found
//        ? "url('https://www.transparenttextures.com/patterns/noise-lines.png')"
//        : "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",

//
//      // textTransform: "uppercase",
//      // border: "1px solid",
//      // borderColor: !word.found ? "grey" : "foundWord.main",
//      borderRadius: "5px",
//      boxShadow: ".5px 1px 1.5px inset black",
//      // boxShadow: !word.found
//      //   ? "2px 2px 2px inset grey"
//      //   : ".5px 1px 1.5px inset black",
//    }}
//  >
//    {word.word}
//  </Typography>;
