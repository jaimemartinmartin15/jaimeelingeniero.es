export const allowedQueryParams = {
  GAME_NAME: {
    paramName: 'juego',
    paramConfig: 'name',
  },
  LIMIT: {
    paramName: 'limite',
    paramConfig: 'limitScore',
  },
  CARDS_NUMBER: {
    paramName: 'cartas',
    paramConfig: 'cardsNumber',
  },
} as const;
