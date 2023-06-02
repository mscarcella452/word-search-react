import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { gameContext } from "../Context/WordSearchProvider";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function WordList() {
  const game = useContext(gameContext);

  return (
    <Box
      sx={{
        ...flexBoxSx,
        width: 1,
        height: "5rem",
        background: "gray",
        justifyContent: "space-around",
      }}
    >
      {game.wordsList.map(word => (
        <Typography sx={{ textDecoration: word.found && "line-through" }}>
          {word.word}
        </Typography>
      ))}
    </Box>
  );
}

export default WordList;
