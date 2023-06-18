const defaultWords = [
  "marbles",
  "pox",
  "wrist",
  "lake",
  "gray",
  "ninth",
  "pumice",
  "blot",
  "swoop",
  "crop",
  "hula",
  "serve",
  "preface",
  "net",
  "boil",
  "apply",
  "oppose",
  "savor",
  "exes",
  "skewed",
  "army",
  "item",
  "cusp",
  "wipe",
  "trilogy",
  "shy",
  "enamel",
  "status",
  "mobile",
  "motto",
  "flirt",
  "broken",
  "oozy",
  "eats",
  "cola",
  "snarl",
];

let lengthOptions = [4, 5, 6];

export async function fetchWordsAPI(totalWords) {
  let list = [];
  for (let i = 0; i < totalWords; i++) {
    let word;
    if (i === 0) {
      word = await fetchSingleWord(8, i, list);
    } else if (i === 1) {
      word = await fetchSingleWord(7, i, list);
    } else {
      let random = Math.floor(Math.random() * lengthOptions.length);
      word = await fetchSingleWord(lengthOptions[random], i, list);
    }
    list.push(word);
  }

  return list;
}

async function fetchSingleWord(length, index, list) {
  let word;
  let ready = false;
  while (!ready) {
    const response = await fetch(
      `https://random-word-api.vercel.app/api?words=1&length=${length}`
    );
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      const data = await response.json();
      word = data.join();
    } else {
      alert("HTTP-Error: " + response.status);
      if (index > defaultWords.length) {
        let random = Math.floor(Math.random() * defaultWords.length);
        word = defaultWords[random];
      } else word = defaultWords[index];
    }
    // check for duplicate words
    if (!list.includes(word)) {
      ready = true;
      return word;
    }
  }
}
