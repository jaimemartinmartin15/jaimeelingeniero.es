import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllowedQueryParams, AllowedQueryParamsNames, mapNamesQueryParams } from './allowed-query-params';

import { chinchonConfig } from './game-configs/chinchon-config';
import { defaultConfig } from './game-configs/default-config';
import { pochaConfig } from './game-configs/pocha-config';
import { GameConfig, GameConfigTranslatableKeys } from './game-config';

@Injectable()
export class GameConfigService {
  private readonly availableConfigs: GameConfig[] = [pochaConfig, chinchonConfig];
  private config: GameConfig;

  constructor(private readonly activatedRoute: ActivatedRoute) {
    const queryParams = this.activatedRoute.snapshot.queryParams;

    // sets default config and overrides properties based on selected game
    this.config = { ...defaultConfig, ...this.availableConfigs.find((c) => c.name === queryParams[AllowedQueryParams.GAME_NAME]) };

    // overrides other possible configs of the selected game
    Object.keys(queryParams).forEach((queryParamName) => {
      if (!mapNamesQueryParams.hasOwnProperty(queryParamName)) {
        alert(`El parámetro '${queryParamName}' no es admitido como configuración`);
        return;
      }

      const translatedQueryParamName = mapNamesQueryParams[queryParamName as AllowedQueryParamsNames] as GameConfigTranslatableKeys;
      if (translatedQueryParamName === mapNamesQueryParams[AllowedQueryParams.GAME_NAME]) {
        (this.config[translatedQueryParamName] as GameConfig['name']) = queryParams[queryParamName] as string;
      }
      if (translatedQueryParamName === mapNamesQueryParams[AllowedQueryParams.LIMIT_SCORE]) {
        (this.config[translatedQueryParamName] as GameConfig['limitScore']) = +queryParams[queryParamName];
      }
    });
  }
}
