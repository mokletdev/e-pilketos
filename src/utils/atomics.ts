export function getColumnLabel(columnNumber: number) {
  let label: string = "";
  let tempColumnNumber = columnNumber;

  while (tempColumnNumber > 0) {
    let remainder: number = (tempColumnNumber - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    tempColumnNumber = Math.floor((tempColumnNumber - 1) / 26);
  }

  return label;
}

export function shuffle(array: any[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}
