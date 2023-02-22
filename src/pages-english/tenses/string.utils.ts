export const normalizeValue = (value: string): string[] =>
  value?.split('/').map((v) =>
    v
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLocaleLowerCase()
      .trim()
  );
