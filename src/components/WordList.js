import { useContext } from "react";
import { Box } from "@mui/material";
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
          ...flexBoxSx,
          justifyContent: "flex-start",

          height: 1,
          width: 1,
        }}
        spacing={{ xxs: 0.75, sm: 1, md: 1.5 }}
      >
        {game.wordsList.map(word => (
          <Grid
            xxs={3}
            xs={4}
            sm={landscape.mobile ? 4 : landscape.duo ? 6 : 3}
            md={4}
            // md={landscape.mobile || portrait.ipad ? 4 : 4}
            lg={6}
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

                textTransform: "capitalize",
                border: ".5px solid",
                borderRadius: "5px",
                boxShadow: "1px 1px 2px black",
                ...(word.found ? foundWordSx : defaultWordSx),
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

const foundWordSx = {
  borderColor: "foundWord.main",
  backgroundColor: "foundWord.main",
  color: "foundWord.color",
  fontWeight: "bold",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
};
const defaultWordSx = {
  borderColor: "black",
  backgroundColor: "primary.color",
  color: "black",
  fontWeight: "none",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",
};
