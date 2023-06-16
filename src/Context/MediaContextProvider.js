import { createContext } from "react";
import { useMediaQuery } from "@mui/material";

export const mediaContext = createContext();

const media = {
  tiny: "(max-height:350px)",
  small: "(min-width:400px) and (min-height:351px) and (max-height: 374px)",
  medium: "(min-width:400px) and (min-height:375px) and (max-height: 412px)",
  large: "(min-width:400px) and (min-height:413px) and (max-height:450px)",
  extraLarge:
    "(min-width:700px) and (max-width:800px) and (min-height:500px) and (max-height:640px)",

  ipad: "(min-width:1025px) and (min-height: 1024px)",
};

function MediaContextProvider({ children }) {
  const tiny = useMediaQuery(media.tiny);
  const small = useMediaQuery(media.small);
  const medium = useMediaQuery(media.medium);
  const large = useMediaQuery(media.large);
  const extraLarge = useMediaQuery(media.extraLarge);
  const ipad = useMediaQuery(media.ipad);
  const smallIpad = useMediaQuery(media.ipad);

  const mobileLandscape = tiny || small || medium || large || extraLarge;

  return (
    <mediaContext.Provider value={{ mobileLandscape, ipad }}>
      {children}
    </mediaContext.Provider>
  );
}

export default MediaContextProvider;
