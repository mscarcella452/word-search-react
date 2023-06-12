export async function fetchWords() {
  const response = await fetch(
    "https://random-word-api.herokuapp.com/word?number=10"
  );

  if (response.ok) {
    // if HTTP-status is 200-299
    // get the response body (the method explained below)
    let words = await response.json();
    return words;
  } else {
    alert("HTTP-Error: " + response.status);
  }
}

export let results = await fetchWords;
