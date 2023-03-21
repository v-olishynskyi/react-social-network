export const wait = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => resolve(true), ms);
  });

export const singularPluralWord = (
  singularWord: string,
  pluralWord: string,
  count: number
) => {
  const isPlural = count === 0 || count > 1;

  return isPlural ? pluralWord : singularWord;
};

export const declOfNum = (number: number, titles: string[]) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};
