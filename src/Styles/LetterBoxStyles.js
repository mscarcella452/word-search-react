export const defaultLetterBoxSx = {
  unselectedBoxes: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: ".5px -.5px 2px inset black",
    borderRadius: "2.5px",

    // border: {
    //   mobile_xxs: "1px solid transparent",
    //   mobile_lg: "1.25px solid transparent",
    //   sm: "2px solid transparent",
    //   lg: "2.5px solid transparent",
    // },
    cursor: "pointer",
    color: "#fff",
    backgroundColor: "primary.main",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
    // transition: "all .5s ease-out",
    // // fontFamily: "'Kalam', cursive",
    // // fontFamily: "'Sigmar', cursive",
    fontFamily: "'Lalezar', cursive",
    textTransform: "lowercase",
  },

  selectedBoxes: {
    boxShadow: "none",
    // border: {
    //   mobile_xxs: "1px solid",
    //   mobile_lg: "1.25px solid",
    //   sm: "2px solid",
    //   lg: "2.5px solid",
    // },
    borderColor: {
      mobile_xxs: "primary.main",
      mobile_lg: "primary.main",
      sm: "primary.main",
      lg: "primary.main",
    },
    backgroundColor: "transparent",
    color: "primary.color",
    // fontWeight: "bold",
  },

  foundBoxes: {
    // border: {
    //   mobile_xxs: "1px solid",
    //   mobile_lg: "1.25px solid",
    //   sm: "2px solid",
    //   lg: "2.5px solid",
    // },
    borderColor: {
      mobile_xxs: "foundWord.main",
      mobile_lg: "foundWord.main",
      sm: "foundWord.main",
      lg: "foundWord.main",
    },
    backgroundColor: "foundWord.main",
    color: "foundWord.color",
    // fontWeight: "bold",
    // textTransform: "uppercase",
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/noise-lines.png')",
  },

  hover: {
    boxShadow: "none",
    transition: "all .1s ease-out",
    color: "primary.color",
    backgroundColor: "primary.hoverBackground",
    // fontWeight: "bold",
    // border: {
    //   mobile_xxs: "1px solid",
    //   mobile_lg: "1.25px solid",
    //   sm: "2px solid",
    //   lg: "2.5px solid",
    // },
    borderColor: {
      mobile_xxs: "primary.main",
      mobile_lg: "primary.main",
      sm: "primary.main",
      lg: "primary.main",
    },
  },
};
