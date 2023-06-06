function withinRange(min, max, number) {
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
  let selectedBoxes = [];

  puzzle.map(row =>
    row.map(box => {
      if (box.selected === true) {
        selectedBoxes.push(box);
      }
    })
  );

  const sameRow = initial.row === selectedBoxes[1].row;
  const sameCol = initial.col === selectedBoxes[1].col;
  const initialColLess = initial.col < selectedBoxes[1].col;
  const initialColMore = initial.col > selectedBoxes[1].col;
  const initialRowLess = initial.row < selectedBoxes[1].row;
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
    direction === option && selectedBoxes.reverse();
  });

  // turn selectedBoxes array into selected word string
  let word = "";
  selectedBoxes.map(box => (word += box.letter));

  return { word, selectedBoxes };
}
