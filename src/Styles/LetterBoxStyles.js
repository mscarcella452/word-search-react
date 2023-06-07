export const defaultLetterBoxSx = {
  unselectedBoxes: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: ".5px -.5px 2px inset black",
    borderRadius: "5px",
    margin: "3.5px",
    width: "35px",
    height: "35px",
    fontSize: "1.25rem",
    cursor: "pointer",
    border: "none",
    color: "letterBox.color",
    backgroundColor: "letterBox.main",
    transition: "all .5s ease-out",
  },
  selectedBoxes: {
    boxShadow: "none",
    border: "2.5px solid",
    borderColor: "primary.main",
    backgroundColor: "transparent",
    color: "primary.color",
    fontWeight: "bold",
  },
  foundBoxes: {
    border: "2.5px solid",
    borderColor: "foundWord.main",
    backgroundColor: "foundWord.main",
    color: "foundWord.color",
    fontWeight: "bold",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  },

  hover: {
    boxShadow: "none",
    transition: "all .1s ease-out",
    color: "primary.color",
    backgroundColor: "primary.hoverBackground",
    fontWeight: "bold",
    border: "2.5px solid",
    borderColor: "primary.main",
  },
};
