import { useContext } from "react";
// material ui
import { Box, Typography } from "@mui/material";
// context
import { mediaContext } from "../Context/MediaContextProvider";

function Title() {
  const { landscape, ipad, portrait } = useContext(mediaContext);

  const titleAspectRatio = ipad
    ? "60px"
    : {
        xxs: "35px",
        xs: landscape.mobile ? "30px" : "40px",
        mobile: "40px",
        sm: landscape.galaxy ? "25px" : landscape.mobile ? "45px" : "75px",
        lg: "100px",
      };
  return (
    <Box
      sx={{
        ...flexBoxSx,
        gap: "1rem",
        justifyContent: landscape.phone
          ? "flex-start"
          : {
              xxs: "space-around",
              sm: landscape.duo ? "flex-start" : "space-around",
              md: portrait.ipad ? "space-around" : "flex-start",
            },
        height: titleAspectRatio,

        // background: {
        //   xxs: "blue",
        //   xs: "purple",
        //   mobile: "orange",
        //   sm: "yellow",
        //   md: "green",
        //   lg: "red",
        // },
      }}
    >
      <Box
        sx={{
          ...iconSx,
          display:
            landscape.phone || landscape.duo
              ? "none"
              : {
                  xxs: "flex",
                  md: portrait.ipad ? "flex" : "none",
                },
          width: titleAspectRatio,
          transform: "rotate(180deg)",
        }}
      />
      <Typography
        elevation={10}
        sx={{
          ...titleSx,
          fontSize: ipad
            ? "3rem"
            : {
                xxs: "1.15rem",
                xs: landscape.mobile ? "1.15rem" : "1.5rem",
                sm: landscape.galaxy ? "1.15rem" : "2rem",
                md: landscape.mobile ? "1.5rem" : "3rem",
                lg: "3rem",
              },
        }}
      >
        Word Search
      </Typography>
      <Box
        sx={{
          ...iconSx,
          width: titleAspectRatio,
        }}
      />
    </Box>
  );
}

export default Title;

const flexBoxSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 1,
  height: 1,
};

const titleSx = {
  ...flexBoxSx,
  height: 1,
  width: "fit-content",
  fontFamily: "'Sigmar', cursive",
  color: "secondary.main",
  textShadow: "1px 1px 1px #000",
};

const iconSx = {
  height: 1,
  width: 1,
  backgroundImage:
    'url("https://cdn.pixabay.com/photo/2012/05/07/18/42/magnifying-glass-48956_1280.png")',
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};
