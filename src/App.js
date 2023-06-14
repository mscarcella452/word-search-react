import { useState, useEffect, useRef, useCallback } from "react";
import { useToggle } from "./customHooks";
import { Box, Typography, Button } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import { generatePuzzle, organizeWordsList } from "./functions/generatePuzzle";
import WordSearchProvider from "./Context/WordSearchProvider";
import WordList from "./components/WordList";
import StylesProvider from "./Context/StylesProvider";
import "./App.css";

export const media = {
  tiny: "(max-height:350px)",
  small: "(min-width:400px) and (min-height:351px) and (max-height: 374px)",
  medium: "(min-width:400px) and (min-height:375px) and (max-height: 412px)",
  large: "(min-width:400px) and (min-height:413px) and (max-height:450px)",
  extraLarge:
    "(min-width:700px) and (max-width:800px) and (min-height:500px) and (max-height:640px)",
  ipad: "(min-width:1025px) or (min-height: 1024px) and (min-height: 700px)",
};

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

const defaultGridSize = { rows: 11, columns: 13 };

const defaultColors = {
  primary: {
    background: "#3F497F",
    color: "#fff",
    hoverBackground: "transparent",
    borderColor: "#3F497F",
  },
  letterBox: { background: "#fff", color: "#000", borderColor: "#fff" },
  wordList: { background: "#187498", color: "#000" },
  foundWord: {
    background: "#539165",
    color: "#fff",
    borderColor: "#539165",
  },
  fail: { background: "#EB5353", color: "#fff", borderColor: "#EB5353ff" },
};

function App({
  letterBoxStyles = "",
  puzzleContainerStyles = "",
  wordListStyles = "",
  customColors = defaultColors,
  gridSize = defaultGridSize,
  words = "",
  totalWords = 12,
}) {
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
        let completePuzzle;
        if (words === "") {
          setWordsList(data);
          completePuzzle = generatePuzzle(data, gridSize);
        } else {
          setWordsList(words);
          completePuzzle = generatePuzzle(words, gridSize);
        }
        setPuzzle(completePuzzle);
      }
    })();

    return () => (loading = false);
  }, []);
  // const completePuzzle = generatePuzzle(words, gridSize);

  const handlePlayAgain = () => {
    (async () => {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${totalWords}&length=${5}`
      );
      const data = await response.json();

      let completePuzzle = generatePuzzle(data, gridSize);

      setWordsList(data);

      setPuzzle(completePuzzle);
    })();
  };

  return (
    <StylesProvider
      letterBoxStyles={letterBoxStyles}
      customColors={customColors}
    >
      <Box sx={appSx}>
        {wordsList && (
          <WordSearchProvider words={wordsList}>
            <Box sx={containerSx}>
              <Box
                sx={{
                  ...flexBoxSx,
                  width: { mobile_xxs: 1, md: "fit-content" },
                  height: { mobile_xxs: "fit-content", md: 1 },
                  "@media (max-height: 350px)": {
                    height: 1,
                  },

                  "@media (min-width:400px) and (max-height:450px)": {
                    height: 1,
                  },

                  maxHeight: 1,
                }}
              >
                <PuzzleContainer
                  wordsList={wordsList}
                  completePuzzle={puzzle}
                  puzzleContainerStylesProp={puzzleContainerStyles}
                  handlePlayAgain={handlePlayAgain}
                />
              </Box>
              <WordList wordListStylesProp={wordListStyles} />
              {/* </Box> */}
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
  overflow: "hidden",
  width: 1,
  height: "100vh",
  padding: { mobile_xxs: ".5rem", mobile_xs: "1rem", md: "1.5rem", lg: "2rem" },
  // backgroundImage:
  //   "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  backgroundColor: "foundWord.main",
};

const containerSx = {
  ...flexBoxSx,
  flexDirection: { mobile_xxs: "column", md: "row" },
  "@media (max-height: 450px)": {
    flexDirection: "row",
  },
  "@media (min-height: 1200px)": {
    flexDirection: "column",
  },
  "@media (min-width:700px)": {
    "@media (min-height:500px) and (max-height:640px)": {
      flexDirection: "row",
    },
  },
  // justifyContent: { moblie_xxs: "flex-end", md: "center" },
  // alignItems: "space-around",
  // justifyContent: "flex-start",

  width: 1,
  height: 1,
  gap: { mobile_xxs: ".5rem", mobile_lg: "1rem", md: "1.5rem", lg: "2rem" },
  position: "relative",
  // border: "2px solid black",
  // borderRadius: "25px",
  // boxShadow: "1.25px 1.25px 1.75px black",
};

const titleSx = {
  ...flexBoxSx,
  width: 1,
  padding: ".5rem 1rem",
  textTransform: "uppercase",
  fontSize: { xxs: "1rem", mobile: "1.5rem", md: "2rem" },
  fontWeight: "bold",
  fontFamily: "'Kalam', cursive",
  // textDecoration: "underline",
};
