export const defaultLetterBoxSx = {
  unselectedBoxes: {
    width: 1,
    height: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: ".5px -.5px 2px inset black",
    borderRadius: "2.5px",
    cursor: "pointer",
    color: "primary.color",
    backgroundColor: "primary.main",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
    fontFamily: "'Lalezar', cursive",
    textTransform: "lowercase",
  },

  foundBoxes: {
    color: "foundWord.color",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
    backgroundColor: "foundWord.main",
  },

  highlightedBoxes: {
    color: "primary.color",
    backgroundColor: "primary.hoverBackground",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  },
};
