import { useState, useEffect, useContext } from "react";
import { useToggle } from "./customHooks";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import PuzzleContainer from "./components/PuzzleContainer";
import { generatePuzzle, organizeWordsList } from "./functions/generatePuzzle";
import WordSearchProvider from "./Context/WordSearchProvider";
import WordList from "./components/WordList";
import StylesProvider from "./Context/StylesProvider";
import { mediaContext } from "./Context/MediaContextProvider";
import "./App.css";

export const media = {
  tiny: "(max-height:350px)",
  small: "(min-width:400px) and (min-height:351px) and (max-height: 374px)",
  medium: "(min-width:400px) and (min-height:375px) and (max-height: 412px)",
  large: "(min-width:400px) and (min-height:413px) and (max-height:450px)",
  extraLarge:
    "(min-width:700px) and (max-width:800px) and (min-height:500px) and (max-height:640px)",
  ipad: "(min-width:1025px) or (min-height: 1024px)",
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

const defaultGridSize = { rows: 11, cols: 13 };

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
  totalWords = 15,
}) {
  const { landscape, ipad, portrait } = useContext(mediaContext);

  const [puzzle, setPuzzle] = useState();
  const [wordsList, setWordsList] = useState();

  useEffect(() => {
    let loading = true;
    (async () => {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${totalWords}&length=${8}`
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
        `https://random-word-api.vercel.app/api?words=${totalWords}&length=${8}`
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
            <Typography
              elevation={10}
              sx={{
                width: 1,
                height: ipad
                  ? "60px"
                  : {
                      xxs: "35px",
                      xs: landscape.mobile ? "30px" : "40px",
                      mobile: "40px",
                      sm: landscape.galaxy ? "25px" : "45px",
                    },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // // fontFamily: "'Kalam', cursive",
                fontFamily: "'Sigmar', cursive",
                // fontFamily: "'Lalezar', cursive",
                color: "primary.color",
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
              {/* <Box
                sx={{
                  ...flexBoxSx,
                  flexDirection: "column",
                  // width: { mobile_xxs: 1, md: "fit-content" },
                  // height: { mobile_xxs: "fit-content", md: 1 },
                  // "@media (max-height: 350px)": {
                  //   height: 1,
                  // },

                  // "@media (min-width:400px) and (max-height:450px)": {
                  //   height: 1,
                  // },
                  height: "fit-content",
                  width: "fit-content",

                  maxWidth: 1,

                  maxHeight: 1,
                  gap: ".5rem",

                  background: {
                    xxs: "blue",
                    xs: "purple",
                    mobile: "orange",
                    sm: "yellow",
                    md: "green",
                    lg: "gray",
                  },
                }}
              > */}

              <PuzzleContainer
                wordsList={wordsList}
                completePuzzle={puzzle}
                puzzleContainerStylesProp={puzzleContainerStyles}
                handlePlayAgain={handlePlayAgain}
                gridSize={gridSize}
              />
              {/* </Box> */}

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

  // backgroundImage:
  //   "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')",
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  backgroundColor: "primary.dark",
};

const containerSx = {
  ...flexBoxSx,

  // "@media (max-height: 450px)": {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   alignItems: "center",
  // },
  // "@media (min-height: 1200px)": {
  //   flexDirection: "column",
  //   justifyContent: "center",
  //   alignItems: "space-around",
  // },
  // "@media (min-width:700px)": {
  //   "@media (min-height:500px) and (max-height:640px)": {
  //     flexDirection: "row",
  //     justifyContent: "space-around",
  //     alignItems: "center",
  //   },
  // },
  // justifyContent: { moblie_xxs: "flex-end", md: "center" },
  // alignItems: { xxs: "space-around", md: "center" },
  justifyContent: "space-around",

  // justifyContent: "flex-start",

  width: 1,
  height: 1,

  gap: { xxs: ".5rem", mobile: "1rem", md: "none" },
  position: "relative",
  // background: "teal",
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
