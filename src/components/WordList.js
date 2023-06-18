import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
// material ui
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
// context
import { gameContext } from "../Context/WordSearchProvider";
import { mediaContext } from "../Context/MediaContextProvider";

function WordList({ wordListStylesProp }) {
  const game = useContext(gameContext);
  const { ipad, landscape, portrait } = useContext(mediaContext);

  const cols = {
    xxs: 4,
    xs: landscape.phone ? 6 : 4,
    sm: landscape.mobile ? 4 : landscape.duo ? 6 : 3,
    md: 6,
    lg: 6,
  };

  return (
    <Box
      sx={{
        ...flexBoxSx,
        ...wordListStylesProp,
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
      }}
    >
      <Grid
        container
        sx={{
          ...flexBoxSx,
          justifyContent: "flex-start",
        }}
        spacing={{ xxs: 0.75, sm: landscape.phone ? 1 : 1.5 }}
      >
        {game.wordsList.map(word => (
          <Grid
            xxs={cols.xxs}
            xs={cols.xs}
            sm={cols.sm}
            md={cols.md}
            lg={cols.lg}
            key={uuidv4()}
            sx={{
              maxHeight: ipad
                ? "90px"
                : { xxs: "45px", mobile: "50px", md: "70px" },
              height: {
                // height = 100%  divided by ( totalWords / # of columns)
                xxs: `${
                  100 / Math.ceil(game.wordsList.length / (12 / cols.xxs))
                }%`,
                xs: `${
                  100 / Math.ceil(game.wordsList.length / (12 / cols.xs))
                }%`,
                sm: `${
                  100 / Math.ceil(game.wordsList.length / (12 / cols.sm))
                }%`,
                md: `${
                  100 / Math.ceil(game.wordsList.length / (12 / cols.md))
                }%`,
                lg: `${
                  100 / Math.ceil(game.wordsList.length / (12 / cols.lg))
                }%`,
              },
            }}
          >
            <Box
              sx={{
                ...labelContainerSx,
                fontSize: ipad
                  ? "1.8rem"
                  : {
                      xxs: ".8rem",
                      xs: landscape.mobile ? ".8rem" : "1rem",
                      mobile: "1.1rem",
                      sm: landscape.galaxy ? ".8rem" : "1.1rem",
                      md: landscape.mobile ? "1.1rem" : "1.25rem",
                      lg: "1.5rem",
                    },
                borderRadius: ipad ? "10px" : "5px",
                ...(word.found && foundWordSx),
              }}
            >
              <Box
                sx={{
                  ...labelSx,
                  borderRadius: ipad ? "10px" : "5px",
                  ...(word.found && foundWordSx),
                }}
              >
                {word.word}
              </Box>
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
  width: 1,
  height: 1,
};

const labelSx = {
  ...flexBoxSx,
  fontFamily: "'Lalezar', cursive",
  // fontFamily: "'Kalam', cursive",
  textTransform: "capitalize",
  boxShadow: "1px 1px 2px inset black",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  color: "primary.color",
};

const foundWordSx = {
  backgroundColor: "foundWord.main",
  color: "foundWord.color",
  borderColor: { xxs: "foundWord.main", mobile: "foundWord.main" },
};

const labelContainerSx = {
  ...flexBoxSx,
  border: { xxs: ".5px solid", mobile: "2px solid" },
  boxShadow: "1px 1px 2px black",
  borderColor: { xxs: "primary.light", mobile: "primary.light" },
  backgroundColor: "primary.main",
};
