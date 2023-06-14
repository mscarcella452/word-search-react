const mediaStyles = {
  "@media (max-height: 350px)": {
    margin: "2px",
    width: "15px",
    height: "15px",
    fontSize: ".6rem",
    borderRadius: "2.5px",
  },

  "@media (min-height:351px) and (max-height: 374px)": {
    margin: "2.5px",
    width: "19px",
    height: "19px",
    fontSize: ".9rem",
    borderRadius: "2.5px",
  },
  "@media (min-height:375px) and (max-height: 412px)": {
    margin: "3px",
    width: "22px",
    height: "22px",
    fontSize: ".9rem",
    borderRadius: "2.5px",
  },
  "@media (min-height:413px) and (max-height:450px)": {
    margin: "3px",
    width: "25px",
    height: "25px",
    fontSize: ".9rem",
  },

  "@media (min-width:700px) and (max-width: 800px)": {
    "@media (min-height:500px) and (max-height:640px)": {
      margin: "3px",
      width: "22px",
      height: "22px",
      fontSize: ".9rem",
    },
  },
  "@media (min-width:1025px) or (min-height: 1024px)": {
    "@media (min-height: 800px)": {
      margin: "3px",
      width: "40px",
      height: "40px",
      fontSize: "1.25rem",
    },
  },
};

export const defaultLetterBoxSx = {
  unselectedBoxes: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: ".5px -.5px 2px inset black",
    borderRadius: "5px",
    margin: {
      mobile_xxs: "2px",
      mobile_xs: "1.75px",
      mobile_md: "2px",
      mobile_lg: "2.5px",
      md: "3px",
      // md: "3.25px",
      lg: "3.5px",
    },
    width: {
      mobile_xxs: "16px",
      mobile_xs: "22px",
      mobile_md: "24px",
      mobile_lg: "30px",
      md: "32.5px",
      // md: "35px",
      lg: "40px",
    },
    height: {
      mobile_xxs: "16px",
      mobile_xs: "22px",
      mobile_md: "24px",
      mobile_lg: "30px",
      mobile: "30px",
      md: "32.5px",
      // md: "35px",
      lg: "40px",
    },
    fontSize: {
      mobile_xxs: ".6rem",
      mobile_xxs: ".6rem",
      mobile_xs: ".9rem",
      mobile_md: "1rem",
      mobile_lg: "1.1rem",
      sm: "1.15rem",
      md: "1.25rem",
      lg: "1.45rem",
    },
    ...mediaStyles,
    cursor: "pointer",
    border: "none",
    color: "letterBox.color",
    backgroundColor: "letterBox.main",
    transition: "all .5s ease-out",
    // fontFamily: "'Kalam', cursive",
    // fontFamily: "'Sigmar', cursive",
    fontFamily: "'Lalezar', cursive",
    textTransform: "lowercase",
  },

  selectedBoxes: {
    boxShadow: "none",
    border: {
      mobile_xxs: "1px solid",
      mobile_lg: "1.25px solid",
      sm: "2px solid",
      lg: "2.5px solid",
    },
    borderColor: {
      mobile_xxs: "primary.main",
      mobile_lg: "primary.main",
      sm: "primary.main",
      lg: "primary.main",
    },
    backgroundColor: "transparent",
    color: "primary.color",
    // fontWeight: "bold",
    ...mediaStyles,
  },

  foundBoxes: {
    border: {
      mobile_xxs: "1px solid",
      mobile_lg: "1.25px solid",
      sm: "2px solid",
      lg: "2.5px solid",
    },
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
    ...mediaStyles,
  },

  hover: {
    boxShadow: "none",
    transition: "all .1s ease-out",
    color: "primary.color",
    backgroundColor: "primary.hoverBackground",
    // fontWeight: "bold",
    border: "2.5px solid",
    borderColor: "primary.main",
    ...mediaStyles,
  },
};
