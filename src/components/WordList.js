import { useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { gameContext, dispatchContext } from "../Context/WordSearchProvider";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function WordList({ wordsList }) {
  // const [foundWord, setFoundWord] = useState();
  const game = useContext(gameContext);
  const dispatch = useContext(dispatchContext);

  function updateWordsList() {
    wordsList.map(word => {
      if (word.word.toUpperCase() === game.selected.word.toUpperCase()) {
        word.found = true;
        game.selected.boxes.map(box => (box.found = true));
        console.log(game.selected.boxes);

        // dispatch({
        //   type: "found_words",
        //   foundWord: game.selected.word,
        // });
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
        <Typography sx={{ textDecoration: word.found && "line-through" }}>
          {word.word}
        </Typography>
      ))}
    </Box>
  );
}

export default WordList;
