import { useReducer, createContext } from "react";

export const gameContext = createContext();
export const dispatchContext = createContext();

const ACTIONS = {
  FOUND_WORDS: "found_words",
  SELECTED_WORD: "selected_word",
  // SELECTED_LETTERS: "selected_letters",
  // INITIAL_BOX: "initial_box",
  // DIRECTION: "direction",
  // SUBMIT_WORD: "submit-word",
};

function setDirection(box1, box2) {
  const matrix = [
    { row: box1.row + 1, col: box1.col - 1, direction: "downLeftDiag" },
    { row: box1.row + 1, col: box1.col, direction: "down" },
    { row: box1.row + 1, col: box1.col + 1, direction: "downRightDiag" },
    { row: box1.row, col: box1.col - 1, direction: "left" },
    { row: box1.row, col: box1.col + 1, direction: "right" },
    { row: box1.row - 1, col: box1.col - 1, direction: "upLeftDiag" },
    { row: box1.row - 1, col: box1.col, direction: "up" },
    { row: box1.row - 1, col: box1.col + 1, direction: "upRightDiag" },
  ];
  for (let option of matrix) {
    if (box2.row === option.row && box2.col === option.col) {
      return option.direction;
    }
  }
}

const initialValue = {
  found: [],
  selected: { word: "", boxes: [] },
  // box1: "",
  // direction: "",
  // wordsList: wordsList,
};

const wordsReducer = (game, action) => {
  switch (action.type) {
    case ACTIONS.FOUND_WORDS:
      return {
        ...game,
        selected: { word: "", boxes: [] },
        found: [...game.found, action.foundWord],
      };
    case ACTIONS.SELECTED_WORD:
      // action.selected.map(box => console.log(box.letter));
      return {
        ...game,
        selected: { word: action.word, boxes: [...action.boxes] },
      };
    // case ACTIONS.SELECTED_LETTERS:
    //   return {
    //     ...game,
    //     selected: [...game.selected, action.letter],
    //   };
    // case ACTIONS.INITIAL_BOX:
    //   return {
    //     ...game,
    //     box1: action.box1,
    //   };
    // case ACTIONS.DIRECTION:
    //   let direction = setDirection(game.box1, action.box2);

    //   // if (box1.x === box2.x) {
    //   // }
    //   return {
    //     ...game,
    //     direction: direction,
    //   };
    // case ACTIONS.SUBMIT_WORD:
    //   console.log(action.word);
    //   let checkWords = game.wordsList.map(word =>
    //     word.word.toLowerCase() === action.word.toLowerCase()
    //       ? (word = { ...word, found: true })
    //       : (word = { ...word, found: false })
    //   );
    //   console.log(checkWords);
    //   return {
    //     ...game,
    //     wordsList: checkWords,
    //   };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};
function WordSearchProvider({ wordsList, children }) {
  const [game, gameDispatch] = useReducer(wordsReducer, initialValue);
  return (
    <dispatchContext.Provider value={gameDispatch}>
      <gameContext.Provider value={game}>{children}</gameContext.Provider>
    </dispatchContext.Provider>
  );
}

export default WordSearchProvider;
