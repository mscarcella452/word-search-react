export function withinRange(min, max, number) {
  return number >= min && number <= max ? true : false;
}
// ------------------------------------------------------------
function checkDiagonal(initial, current, box) {
  const diagonalOptions = [
    {
      // name: "topLeft",
      row: { min: current.row, max: initial.row },
      col: { min: current.col, max: initial.col },
    },
    {
      // name: "topRight",
      row: { min: current.row, max: initial.row },
      col: { min: initial.col, max: current.col },
    },
    {
      // name: "bottomLeft",
      row: { min: initial.row, max: current.row },
      col: { min: current.col, max: initial.col },
    },
    {
      // name: "bottomRight",
      row: { min: initial.row, max: current.row },
      col: { min: initial.col, max: current.col },
    },
  ];

  for (let option of diagonalOptions) {
    if (
      withinRange(option.row.min, option.row.max, box.row) &&
      withinRange(option.col.min, option.col.max, box.col)
    ) {
      return true;
    }
  }
}

// ------------------------------------------------------------
export function selectBoxes(initial, current, puzzle) {
  if (initial && current) {
    // selecting diagonal boxes
    puzzle.map(row =>
      row.map(box =>
        checkDiagonal(initial, current, box) &&
        (box.row + box.col === initial.row + initial.col ||
          box.row - box.col === initial.row - initial.col)
          ? (box.selected = true)
          : (box.selected = false)
      )
    );

    // ------------------
    // selecting horizontal boxes
    if (current.row === initial.row) {
      puzzle[current.row].map(box =>
        (box.col >= current.col && box.col <= initial.col) ||
        (box.col <= current.col && box.col >= initial.col)
          ? (box.selected = true)
          : (box.selected = false)
      );
    }
    // ------------------
    // selecting vertical boxes
    if (current.col === initial.col) {
      for (var i = 0; i < puzzle.length; i++) {
        let box = puzzle[i][initial.col];

        (box.row >= current.row && box.row <= initial.row) ||
        (box.row <= current.row && box.row >= initial.row)
          ? (box.selected = true)
          : (box.selected = false);
      }
    }
  }
}

// ------------------------------------------------------------
// sets boxes that neighbor initial box (left/right, up/down, diagonal) as eligible to be selected
export function checkEligibile(current, initial, puzzle) {
  const length = puzzle[0].length;
  const height = puzzle.length;

  const horizontal =
    current.row === initial.row && withinRange(0, length - 1, current.col);

  const vertical =
    current.col === initial.col && withinRange(0, height - 1, current.row);

  const diagonal =
    current.row + current.col === initial.row + initial.col ||
    current.row - current.col === initial.row - initial.col;

  return horizontal || vertical || diagonal ? true : false;
}

// ------------------------------------------------------------
// sets correct order of selected letters based on direction of highlight
export function organizeSelectedWord(initial, puzzle) {
  // dispatch({ type: "selected_word", selected: "" });
  let boxes = [];

  puzzle.map(row =>
    row.map(box => {
      if (box.selected === true) {
        boxes.push(box);
      }
    })
  );

  if (boxes.length > 1) {
    const sameRow = initial.row === boxes[1].row;
    const sameCol = initial.col === boxes[1].col;
    const initialColLess = initial.col < boxes[1].col;
    const initialColMore = initial.col > boxes[1].col;
    const initialRowLess = initial.row < boxes[1].row;
    let direction;
    // SET DIRECTION OF WORD
    if (sameRow) {
      direction = initialColLess ? "right" : "left";
    } else if (sameCol) {
      direction = initialRowLess ? "down" : "up";
    } else if (initialColMore) {
      direction = initialRowLess ? "downLeft" : "upLeft";
    } else if (initialColLess) {
      direction = initialRowLess ? "downRight" : "upRight";
    }

    // REORDER DIRECTION OF ARRAY SO INITIAL LETTER IS FIRST
    const reorderDirection = ["left", "up", "upLeft", "upRight"];

    reorderDirection.forEach(option => {
      direction === option && boxes.reverse();
    });

    // turn boxes array into selected word string
    let selectedWord = "";
    boxes.map(box => (selectedWord += box.letter));

    return { selectedWord, boxes };
  } else return false;
}

export function updateWordsList(wordsList, initialBox, completePuzzle) {
  const { selectedWord, boxes } = organizeSelectedWord(
    initialBox,
    completePuzzle
  );

  if (selectedWord) {
    let isFound;
    wordsList.map(word => {
      if (word.word.toUpperCase() === selectedWord.toUpperCase()) {
        word.found = true;
        boxes.map(box => (box.found = true));
        isFound = true;
      }
    });

    if (!isFound) {
      boxes.map(box => (box.fail = true));

      setTimeout(() => {
        boxes.map(box => (box.fail = false));
      }, 1000);
    } else
      setTimeout(() => {
        boxes.map(box => (box.locked = true));
      }, 1000);
    return wordsList;
  } else return false;
}
