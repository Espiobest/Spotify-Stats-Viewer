export const capitalize = (arr: Array<string>) => {
  return arr.map((sentence) =>
    sentence.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase()),
  );
};

export const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const getKey = (num: number) => {
  const keyMap: { [key: number]: string } = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B",
  };

  return keyMap[num];
};

export const truncate = (str: string, n: number = 20) => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};
