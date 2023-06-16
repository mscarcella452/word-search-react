import { useReducer, createContext } from "react";
import StylesProvider from "./StylesProvider";

export const gameContext = createContext();
export const dispatchContext = createContext();

const ACTIONS = {
  UPDATE_WORDSLIST: "update_WordsList",
  PLAY_AGAIN: "play_again",
};

const wordsReducer = (game, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_WORDSLIST:
      return {
        wordsList: action.updatedWordsList,
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
function WordSearchProvider({ words, children }) {
  const wordsList = words.map(
    eachWord =>
      (eachWord = {
        word: eachWord,
        found: false,
      })
  );
  const initialValue = {
    wordsList: wordsList,
  };
  const [game, gameDispatch] = useReducer(wordsReducer, initialValue);

  return (
    <dispatchContext.Provider value={gameDispatch}>
      <gameContext.Provider value={game}>{children}</gameContext.Provider>
    </dispatchContext.Provider>
  );
}

export default WordSearchProvider;
