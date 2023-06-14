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
        ...wordsListContainerSx,
        ...wordListStylesProp,
        height: "fit-content",
        width: "fit-content",
        maxWidth: ipad ? 1 : { mobile_xxs: 1, md: "500px" },
        maxHeight: 1,
        // background: { mobile_lg: "yellow", sm: "pink", md: "red" },
      }}
    >
      <Grid
        container
        sx={{ height: 1, width: 1 }}
        spacing={{ mobile_xxs: 0.5, sm: 1 }}
      >
        {game.wordsList.map(word => (
          <Grid
            mobile_xxs={4}
            mobile_md={6}
            mobile_lg={mobileLandscape ? 6 : ipad ? 4 : 3}
            sm={mobileLandscape ? 6 : 3}
            md={ipad ? 4 : 6}
            lg={6}
            key={uuidv4()}
          >
            <Typography
              sx={{
                ...flexBoxSx,
                // textDecoration: word.found && "line-through",
                backgroundColor: word.found ? "foundWord.main" : "#fff",
                color: word.found ? "foundWord.color" : "black",
                fontWeight: word.found && "bold",
                backgroundImage: word.found
                  ? "url('https://www.transparenttextures.com/patterns/noise-lines.png')"
                  : "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",
                width: 1,
                height: 1,
                padding: mobileLandscape
                  ? ".25rem"
                  : { mobile_xxs: ".5rem", mobile_lg: ".75rem" },
                fontFamily: "'Kalam', cursive",
                // fontFamily: "'Lalezar', cursive",
                // fontFamily: "'Sigmar', cursive",
                fontSize: ipad
                  ? "1.75rem"
                  : mobileLandscape
                  ? {
                      mobile_xxs: ".9rem",
                      // mobile_xs: ".9rem",
                      // mobile_md: ".9rem",
                      mobile_lg: "1rem",
                    }
                  : {
                      mobile_xxs: "1rem",
                      mobile_xs: "1.15rem",
                      md: "1.25rem",
                      lg: "1.5rem",
                      xl: "rem",
                    },
                // textTransform: "uppercase",
                border: "1px solid",
                borderColor: !word.found ? "grey" : "foundWord.main",
                borderRadius: "5px",
                boxShadow: !word.found
                  ? "2px 2px 2px inset grey"
                  : ".5px 1px 1.5px inset  black",
              }}
            >
              {word.word}
            </Typography>
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
  width: 1,
  padding: { mobile_xxs: " .25rem", mobile_lg: " 1rem", md: "1rem 1.5rem" },
  overflow: "scroll",
};
