import { directions, letters } from "../data";

// ------------------------------------
// ------------------------------------
// CHECK IF THE WORD CAN BE PLACED AT THE GIVEN POSITION
// ------------------------------------
// ------------------------------------
function isValidPosition(puzzleGrid, word, orientation) {
  const { grid, gridSize, row, col } = puzzleGrid;

  for (let i = -1; i <= word.length; i++) {
    // Start from -1 and end at word.length

    const index = {
      right: { row: row, col: col + i },
      down: { row: row + i, col: col },
      left: { row: row, col: col - i },
      up: { row: row - i, col: col },
      downRightDiag: { row: row + i, col: col + i },
      downLeftDiag: { row: row + i, col: col - i },
      upRightDiag: { row: row - i, col: col + i },
      upLeftDiag: { row: row - i, col: col - i },
    };

    let newRow = index[orientation].row;
    let newCol = index[orientation].col;

    // ------------------------------------
    // CHECK IF THE POSITION IS WITHIN THE GRID BOUNDS:
    // ------------------------------------
    // is the position  not within the grid bounds?
    const outsideGrid =
      newRow < 0 ||
      newRow >= gridSize.rows ||
      newCol < 0 ||
      newCol >= gridSize.columns;
    // positions before the first letter and after the last letter?
    const notLetterIndex = i < 0 || i >= word.length;

    if (outsideGrid) {
      // ------------------------------------
      // IGNORE THE CHECK FOR POSITIONS BEFORE THE FIRST LETTER AND AFTER THE LAST LETTER:
      // ------------------------------------
      if (notLetterIndex) {
        continue;
      }
      return false;
    }

    // ------------------------------------
    // CHECK IF THE BOX IS EMPTY:
    // ------------------------------------
    // is the box empty?
    const emptyBox = grid[newRow][newCol] === ".";
    // does the box contains the same character as the word?
    // const duplicateLetter = grid[newRow][newCol] !== word[i];
    const takenBox = i >= 0 && i < word.length && !emptyBox; // && duplicateLetter

    if (takenBox) return false;

    // ------------------------------------
    // CHECK FOR THE EMPTY SPACE BETWEEN THE WORDS:
    // ------------------------------------
    if (notLetterIndex && !emptyBox) return false;
  }

  return true;
}

// ------------------------------------
// ------------------------------------
// PLACE WORDS IN GRID
// ------------------------------------
// ------------------------------------
function placeWords(grid, gridSize, words) {
  for (const word of words) {
    let placed = false;
    let attempts = 0;
    const maxAttempts = 100;

    while (!placed && attempts < maxAttempts) {
      const orientation =
        directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * gridSize.rows);
      const col = Math.floor(Math.random() * gridSize.columns);

      const puzzleGrid = { grid, gridSize, row, col };
      if (isValidPosition(puzzleGrid, word, orientation)) {
        word.forEach((letter, i) => {
          const index = {
            right: { row: row, col: col + i },
            down: { row: row + i, col: col },
            left: { row: row, col: col - i },
            up: { row: row - i, col: col },
            downRightDiag: { row: row + i, col: col + i },
            downLeftDiag: { row: row + i, col: col - i },
            upRightDiag: { row: row - i, col: col + i },
            upLeftDiag: { row: row - i, col: col - i },
          };
          const rowIndex = index[orientation].row;
          const columnIndex = index[orientation].col;

          grid[rowIndex][columnIndex] = letter;
        });

        placed = true;
      }
      attempts++;
    }

    if (attempts >= maxAttempts) {
      console.log(`Failed to place the word: ${word}`);
      // return false;
    }
  }
}

// ------------------------------------
// ------------------------------------
// ADD RANDOM LETTERS TO EMPTY BOXES IN GRID
// ------------------------------------
// ------------------------------------
function addMissingLetters(grid) {
  const randomLetter = () => Math.floor(Math.random() * letters.length);

  return grid.map((row, rowIndex) =>
    row.map(
      (letter, columnIndex) =>
        letter === "."
          ? (letter = {
              letter: "--",
              // letter: `${rowIndex}, ${columnIndex}`,
              // letter: letters[randomLetter()],
              selected: false,
              found: false,
              fail: false,
              row: rowIndex,
              col: columnIndex,
            })
          : (letter = {
              // letter: `${rowIndex}, ${columnIndex}`,
              letter: letter,
              selected: false,
              found: false,
              fail: false,
              row: rowIndex,
              col: columnIndex,
            })
      //   letter === "." ? (letter = "--") : (letter = letter)
    )
  );
}

// ------------------------------------
// ------------------------------------
// ORGANIZE WORDS LIST
// ------------------------------------
// ------------------------------------
function organizeWordsList(wordsList) {
  // sort by length (long to short)
  wordsList.sort((a, b) => b.length - a.length);
  //   two dimensional array for individual letters in each word i.e ['happy'] --> [['h','a', 'p', 'p', 'y']]
  return wordsList.map(word => Array.from(word.word.toUpperCase()));
}

// ------------------------------------
// ------------------------------------
// GENERATE PUZZLE
// ------------------------------------
// ------------------------------------
export default function generatePuzzle(wordsList, gridSize) {
  const words = organizeWordsList(wordsList);

  //   generate puzzle grid
  const puzzleGrid = Array(gridSize.rows)
    .fill(null)
    .map(() => Array(gridSize.columns).fill("."));

  placeWords(puzzleGrid, gridSize, words);

  const completePuzzle = addMissingLetters(puzzleGrid);

  return completePuzzle;
}
