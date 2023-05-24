import { useState, useEffect, useRef } from "react";
import { useToggle } from "../customHooks";
import { Box, Typography } from "@mui/material";
import { words, matrix } from "./data";

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 1,
  width: 1,
};

function LetterBox({ selectWord, unselectWord, index, children }) {
  const [selected, toggleSelected] = useToggle(false);

  useEffect(() => {
    selected ? selectWord(children, index) : unselectWord(children, index);
  }, [selected]);

  return (
    <Box
      onClick={toggleSelected}
      sx={{
        ...flexBoxSx,
        border: "1px solid black",
        padding: ".5rem",
        width: "40px",
        height: "40px",
        fontSize: "1.5rem",
        background: selected ? "green" : "transparent",
        cursor: "pointer",
      }}
    >
      {children}
    </Box>
  );
}

export default LetterBox;
