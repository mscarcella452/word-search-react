import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { gameContext } from "../Context/WordSearchProvider";
import { v4 as uuidv4 } from "uuid";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function WordList({ wordsList }) {
  const game = useContext(gameContext);

  function updateWordsList() {
    wordsList.map(word => {
      if (word.word.toUpperCase() === game.selected.word.toUpperCase()) {
        word.found = true;
        game.selected.boxes.map(box => (box.found = true));
      }
    });
  }

  updateWordsList();

  // console.log(game.found);

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
      {wordsList.map(word => (
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
