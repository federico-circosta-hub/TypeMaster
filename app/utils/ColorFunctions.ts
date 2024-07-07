export const UserColors: String[] = [
  "aquamarine",
  "beige",
  "bisque",
  "blueviolet",
  "brown",
  "cadetblue",
  "chocolate",
  "coral",
  "cornflowerblue",
  "darkkhaki",
  "deepskyblue",
  "firebrick",
  "seagreen",
  "khaki",
  "lavender",
];

export const getRandomColor = (): string => {
  return UserColors.sort(() => Math.random() - Math.random())
    .slice(0, 1)[0]
    .toString();
};
