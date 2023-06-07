import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { gameContext } from "../Context/WordSearchProvider";
import { v4 as uuidv4 } from "uuid";

function WordList({ wordListStylesProp }) {
  const game = useContext(gameContext);

  return (
    <Box sx={{ ...wordsListContainerSx, ...wordListStylesProp }}>
      {game.wordsList.map(word => (
        <Typography
          key={uuidv4()}
          sx={{ textDecoration: word.found && "line-through" }}
        >
          {word.word}
        </Typography>
      ))}
    </Box>
  );
}

export default WordList;

const wordsListContainerSx = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "1",
  minWidth: "300px",
  height: 1,

  justifyContent: "space-around",
  textTransform: "uppercase",
  background: "Red",
};
