import { useContext, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { gameContext, dispatchContext } from "../Context/WordSearchProvider";
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
  const dispatch = useContext(dispatchContext);

  // useEffect(() => console.log("hey"), [wordsList]);
  function updateWordsList() {
    let isFound;
    wordsList.map(word => {
      if (word.word.toUpperCase() === game.selected.word.toUpperCase()) {
        word.found = true;
        game.selected.boxes.map(box => (box.found = true));
        isFound = true;
      }
    });

    if (!isFound) {
      game.selected.boxes.map(box => (box.fail = true));

      setTimeout(() => {
        game.selected.boxes.map(box => (box.fail = false));
      }, 1000);
    } else
      setTimeout(() => {
        game.selected.boxes.map(box => (box.locked = true));
      }, 2000);
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
