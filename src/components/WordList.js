import { useContext } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { gameContext } from "../Context/WordSearchProvider";
import { v4 as uuidv4 } from "uuid";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { media } from "../App";

function WordList({ wordListStylesProp }) {
  const game = useContext(gameContext);

  const tiny = useMediaQuery(media.tiny);
  const small = useMediaQuery(media.small);
  const medium = useMediaQuery(media.medium);
  const large = useMediaQuery(media.large);
  const extraLarge = useMediaQuery(media.extraLarge);
  const ipad = useMediaQuery(media.ipad);

  const mobileLandscape = tiny || small || medium || large || extraLarge;

  return (
    <Box
      sx={{
        ...flexBoxSx,
        ...wordListStylesProp,

        height: 1,
        maxHeight: {
          xxs: mobileLandscape ? 1 : 0.4,
          md: 1,
        },
        width: {
          xxs: mobileLandscape ? 0.5 : 1,
          md: "400px",
          lg: "500px",
        },
        maxWidth: {
          xxs: mobileLandscape ? "350px" : 1,
          md: 0.35,
          lg: 1,
        },
        overflow: "scroll",
        // boxShadow: "1px 1px 2.5px inset black",

        // // boxShadow: "1px 1px 5px inset black, -1px -1px 5px inset black",
        // backgroundImage:
        //   "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",
        // padding: ".5rem",
        // backgroundColor: "#fff",

        // background: {
        //   xxs: "blue",
        //   xs: "purple",
        //   mobile: "orange",
        //   sm: "yellow",
        //   md: "green",
        //   lg: "white",
        // },

        // maxWidth: ipad ? 1 : { xxs: 1, md: "400px" },
        // maxHeight: 1,
        // maxWidth: 0.5,
        // minHeight: "100px",

        // background: "Red",
        // background: { mobile_lg: "yellow", sm: "pink", md: "red" },
      }}
    >
      <Grid
        container
        // xxs={12}
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
            // mobile_xxs={4}
            // mobile_md={6}
            // mobile_lg={mobileLandscape ? 6 : ipad ? 4 : 3}
            // sm={mobileLandscape ? 6 : 3}
            // md={ipad ? 4 : 6}
            // lg={6}
            xxs={3}
            xs={4}
            sm={mobileLandscape ? 4 : 3}
            md={mobileLandscape ? 4 : 6}
            sx={{
              // background: {
              //   xxs: "blue",
              //   xs: "purple",
              //   mobile: "orange",
              //   sm: "yellow",
              //   md: "green",
              //   lg: "white",
              // },
              // border: "1px solid black",
              ...flexBoxSx,

              // width: "125px",

              // height: "50px",
            }}
            key={uuidv4()}
          >
            <Box
              sx={{
                ...flexBoxSx,
                width: 1,
                height: 1,
                fontFamily: "'Kalam', cursive",
                fontSize: ipad
                  ? "1.35rem"
                  : {
                      xxs: ".8rem",
                      xs: mobileLandscape ? ".8rem" : "1rem",
                      mobile: "1.1rem",
                      sm: "1.1rem",
                      md: mobileLandscape ? "1.1rem" : "1.25rem",
                      lg: "1.35rem",
                    },
                padding: ipad
                  ? ".5rem"
                  : mobileLandscape
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
