import { createContext } from "react";
import { useMediaQuery } from "@mui/material";

export const mediaContext = createContext();

const media = {
  // tiny: "(max-height:350px)",
  // small: "(min-width:400px) and (min-height:351px) and (max-height: 374px)",
  // medium: "(min-width:400px) and (min-height:375px) and (max-height: 412px)",
  // large: "(min-width:400px) and (min-height:413px) and (max-height:450px)",
  // extraLarge:
  //   "(min-width:700px) and (max-width:800px) and (min-height:500px) and (max-height:640px)",

  mobileLandscape:
    "(max-height:500px) and (min-height:300px) and (min-width:400px)",
  galaxyLandscape: "(max-height:350px) and (min-width:500px)",
  ipadLandscape:
    "(min-width:1024px) and (min-height: 800px)and (max-height: 1025px)",
  ipadPortrait: "(max-width:1025px) and (min-height: 1024px)",
  duoLandscape:
    "(max-width:750px) and (max-height:550px) and (min-height: 501px)",
  // duoPortrait:
  //   "(max-width:550px) and (min-width: 500px) and (max-height750px) and (min-height: 720px)",
  // ipad: "(min-width:1025px) and (min-height: 1024px)",
};

function MediaContextProvider({ children }) {
  // const tiny = useMediaQuery(media.tiny);
  // const small = useMediaQuery(media.small);
  // const medium = useMediaQuery(media.medium);
  // const large = useMediaQuery(media.large);
  // const extraLarge = useMediaQuery(media.extraLarge);
  const duoLandscape = useMediaQuery(media.duoLandscape);
  // const duoPortrait = useMediaQuery(media.duoPortrait);
  const ipadLandscape = useMediaQuery(media.ipadLandscape);
  const ipadPortrait = useMediaQuery(media.ipadPortrait);
  // const ipadTablet = useMediaQuery(media.ipad);
  const mobile = useMediaQuery(media.mobileLandscape);
  const galaxy = useMediaQuery(media.galaxyLandscape);

  // landscape
  const landscape = {
    mobile: mobile,
    galaxy: galaxy,
    phone: mobile || galaxy,
    duo: duoLandscape,
    ipad: ipadLandscape,
  };
  const portrait = {
    ipad: ipadPortrait,
    // duo: duoPortrait,
  };

  const ipad = landscape.ipad || portrait.ipad;

  // const mobileLandscape = tiny || small || medium || large || extraLarge;

  return (
    <mediaContext.Provider value={{ ipad, portrait, landscape }}>
      {children}
    </mediaContext.Provider>
  );
}

export default MediaContextProvider;
