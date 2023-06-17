import { useState, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import { generatePuzzle } from "./functions/generatePuzzle";
import WordSearchProvider from "./Context/WordSearchProvider";
import WordList from "./components/WordList";
import WordsCounter from "./components/WordsCounter";
import StylesProvider from "./Context/StylesProvider";
import { mediaContext } from "./Context/MediaContextProvider";
import "./App.css";

async function fetchWords(total, length) {
  const response = await fetch(
    `https://random-word-api.vercel.app/api?words=${total}&length=${length}`
  );

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let words = await response.json();
    return words;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}
// let wordsApi = await fetchWords(4, 5);
// async function fetchApi() {
//   let words1 = await fetchWords(4, 5);
//   let words2 = await fetchWords(2, 3);
//   let words3 = await fetchWords(3, 6);
//   let words4 = await fetchWords(1, 8);

//   const results = [...words1, ...words2, ...words3, ...words4];
//   return results;
// }

const defaultWords = [
  "javascript",
  "react",
  "html",
  "css",
  "sass",
  "adobe",
  "react",
  "html",
  "css",
  "sass",
  "adobe",
  // "illustrator",
  // "photoshop",
  // "xd",
];

const defaultGridSize = { rows: 11, cols: 13 };

const defaultColors = {
  primary: {
    background: "#3F497F",
    color: "#fff",
    hoverBackground: "transparent",
    borderColor: "#3F497F",
  },
  foundWord: { background: "#539165", color: "#fff" },
  fail: { background: "#EB5353", color: "#fff" },
};

function App({
  letterBoxStyles = "",
  puzzleContainerStyles = "",
  wordListStyles = "",
  customColors = defaultColors,
  gridSize = defaultGridSize,
  words = "",
  totalWords = 1,
}) {
  const { landscape, ipad, portrait } = useContext(mediaContext);

  const [puzzle, setPuzzle] = useState();
  const [wordsList, setWordsList] = useState();

  useEffect(() => {
    let loading = true;
    (async () => {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${totalWords}&length=${5}`
      );
      const data = await response.json();
      if (loading) {
        if (words === "") {
          setWordsList(data);
          handleSetPuzzle(data);
        } else {
          setWordsList(words);
          handleSetPuzzle(words);
        }
      }
    })();

    return () => (loading = false);
  }, []);
  // const completePuzzle = generatePuzzle(words, gridSize);

  // const handlePlayAgain = () => {
  //   (async () => {
  //     const response = await fetch(
  //       `https://random-word-api.vercel.app/api?words=${totalWords}&length=${5}`
  //     );
  //     const data = await response.json();

  //     let completePuzzle = generatePuzzle(data, gridSize);

  //     setWordsList(data);

  //     setPuzzle(completePuzzle);
  //   })();
  // };

  const handleSetPuzzle = data => {
    let completePuzzle = generatePuzzle(data, gridSize);
    setPuzzle(completePuzzle);
  };

  return (
    <StylesProvider
      letterBoxStyles={letterBoxStyles}
      customColors={customColors}
    >
      <Box
        sx={{
          ...appSx,
          padding: {
            xxs: "1rem",
            xs: "1rem",
            mobile: "1.25rem",
            sm: landscape.galaxy
              ? ".5rem"
              : landscape.mobile
              ? "1rem"
              : "1.25rem",
            md: "1.5rem",
            lg: "2rem",
          },
          gap: ipad
            ? portrait.ipad
              ? "1.5rem"
              : "1rem"
            : landscape.phone
            ? "none"
            : ".5rem",
        }}
      >
        {wordsList && (
          <WordSearchProvider words={wordsList}>
            <Box
              sx={{
                position: "relative",
                width: 1,
                height: ipad
                  ? "60px"
                  : {
                      xxs: "35px",
                      xs: landscape.mobile ? "30px" : "40px",
                      mobile: "40px",
                      sm: landscape.galaxy ? "25px" : "45px",
                    },
              }}
            >
              {/* <WordsCounter
                generatePuzzle={handleSetPuzzle}
                totalWords={totalWords}
              /> */}
              <Typography
                elevation={10}
                sx={{
                  ...titleSx,

                  fontSize: ipad
                    ? "3rem"
                    : {
                        xxs: "1.15rem",
                        xs: landscape.mobile ? "1.15rem" : "1.5rem",
                        sm: landscape.galaxy ? "1.15rem" : "1.5rem",
                        md: landscape.mobile ? "1.5rem" : "2rem",
                      },
                  // background: {
                  //   xxs: "blue",
                  //   xs: "purple",
                  //   mobile: "orange",
                  //   sm: "yellow",
                  //   md: "green",
                  //   lg: "transparent",
                  // },
                }}
              >
                -- Word Search --
              </Typography>
            </Box>
            <Box
              sx={{
                ...containerSx,
                flexDirection: landscape.phone
                  ? "row"
                  : {
                      xxs: "column",
                      sm: landscape.duo ? "row" : "column",
                      md: portrait.ipad ? "column" : "row",
                    },
              }}
            >
              <PuzzleContainer
                wordsList={wordsList}
                completePuzzle={puzzle}
                generatePuzzle={handleSetPuzzle}
                totalWords={totalWords}
                puzzleContainerStylesProp={puzzleContainerStyles}
              />
              <WordList wordListStylesProp={wordListStyles} />
            </Box>
          </WordSearchProvider>
        )}
      </Box>
    </StylesProvider>
  );
}

export default App;

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const appSx = {
  ...flexBoxSx,
  flexDirection: "column",
  justifyContent: "flex-start",
  overflow: "hidden",
  width: 1,
  height: "100vh",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  backgroundColor: "primary.dark",
  position: "relative",
};

const containerSx = {
  ...flexBoxSx,
  justifyContent: "space-around",
  width: 1,
  height: 1,
  gap: { xxs: ".5rem", mobile: "1rem", md: "none" },
};

const titleSx = {
  ...flexBoxSx,
  width: 1,
  fontFamily: "'Sigmar', cursive",
  color: "primary.color",
};
