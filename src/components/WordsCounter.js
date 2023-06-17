import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { gameContext, dispatchContext } from "../Context/WordSearchProvider";
import { generatePuzzle } from "../functions/generatePuzzle";

function WordsCounter({ generatePuzzle, totalWords }) {
  const game = useContext(gameContext);
  const dispatch = useContext(dispatchContext);

  const gameOver = !game.counter.rem > 0;

  const handlePlayAgain = () => {
    (async () => {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${totalWords}&length=${5}`
      );
      const data = await response.json();

      const wordsList = data.map(
        eachWord =>
          (eachWord = {
            word: eachWord,
            found: false,
          })
      );

      generatePuzzle(data);

      dispatch({
        type: "update_WordsList",
        updatedWordsList: wordsList,
        rem: data.length,
        total: data.length,
      });
    })();
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: 1,
        width: " fit-content",
        gap: ".25rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        fontSize: { xxs: "1rem", mobile: "1.25rem", md: "1.5rem" },
        padding: ".5rem",
        borderRadius: "5px",
        backgroundColor: gameOver ? "primary.main" : "primary.dark",
        color: "primary.color",

        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
        boxShadow: "1px 1px 2px  black",
        "&:hover": {
          backgroundColor: gameOver && "primary.light",
        },
      }}
    >
      {!gameOver ? (
        <Typography
          sx={{
            fontFamily: "'Kalam', cursive",
            height: 1,
            width: 1,
            fontSize: "inherit",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {`${game.counter.total - game.counter.rem} of ${game.counter.total}`}
        </Typography>
      ) : (
        <Button sx={{ height: 1, width: 1 }} onClick={handlePlayAgain}>
          <Typography
            sx={{
              fontFamily: "'Kalam', cursive",
              height: 1,
              width: 1,
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "primary.color",
            }}
          >
            Play Again?
          </Typography>
        </Button>
      )}
    </Box>
  );
}

export default WordsCounter;
