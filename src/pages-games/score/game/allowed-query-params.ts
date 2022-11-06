import { GameConfigTranslatableKeys } from './game-config';

/**
 * Allowed names for query parameters in the url that sets the configuration
 */
export enum AllowedQueryParams {
  GAME_NAME = 'juego',
  LIMIT_SCORE = 'limite',
}

export type AllowedQueryParamsNames = `${AllowedQueryParams}`;

export const mapNamesQueryParams: { [key in AllowedQueryParams]: GameConfigTranslatableKeys } = {
  [AllowedQueryParams.GAME_NAME]: 'name',
  [AllowedQueryParams.LIMIT_SCORE]: 'limitScore',
} as const;
