import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PREVIOUS_GAME_CONFIG_KEY } from 'src/pages-games/local-storage-keys';
import { allowedQueryParams } from './allowed-query-params';
import { chinchonConfig } from './game-configs/chinchon-config';
import { defaultConfig } from './game-configs/default-config';
import { GameConfig } from './game-configs/game-config';
import { pochaConfig } from './game-configs/pocha-config';
import { unoConfig } from './game-configs/uno-config';

@Injectable()
export class GameConfigService {
  private readonly knownConfigs: GameConfig[] = [pochaConfig, chinchonConfig, unoConfig];
  private _config: GameConfig;

  constructor(private readonly activatedRoute: ActivatedRoute) {
    const queryParams = this.activatedRoute.snapshot.queryParams;

    const gameName = queryParams[allowedQueryParams.GAME_NAME.paramName] ?? defaultConfig.name;
    const selectedConfig = this.knownConfigs.find((c) => c.name === gameName);

    if (selectedConfig == null) {
      alert(`El juego '${gameName}' no es conocido por la aplicación. Se usará la configuración del juego por defecto: ${defaultConfig.name}`);
      this._config = defaultConfig;
    } else {
      this._config = selectedConfig;
    }

    const otherParamNames = Object.keys(queryParams).filter((k) => k != allowedQueryParams.GAME_NAME.paramName);
    otherParamNames.forEach((queryParamName) => {
      const translatedQueryParam = Object.values(allowedQueryParams).find((v) => v.paramName === queryParamName)?.paramConfig;
      if (translatedQueryParam == undefined || !Object.keys(this._config).includes(translatedQueryParam)) {
        alert(`El parámetro '${queryParamName}' no es soportado para el juego '${this._config.name}'`);
        return;
      }

      // checks the param to convert to corresponding type
      if (translatedQueryParam === allowedQueryParams.GAME_NAME.paramConfig) {
        this._config[translatedQueryParam] = queryParams[queryParamName];
      } else if (translatedQueryParam === allowedQueryParams.LIMIT.paramConfig) {
        this._config[translatedQueryParam] = +queryParams[queryParamName];
      } else if (translatedQueryParam === allowedQueryParams.CARDS_NUMBER.paramConfig) {
        this._config[translatedQueryParam] = +queryParams[queryParamName];
      }
    });
  }

  public get config(): GameConfig {
    return this._config;
  }

  public loadConfigFromLocalStorage() {
    const previousGameConfig = localStorage.getItem(PREVIOUS_GAME_CONFIG_KEY);
    if (previousGameConfig != null) {
      const config = JSON.parse(previousGameConfig).config;
      const knownConfig = this.knownConfigs.find((c) => c.name === config);
      this._config = { ...knownConfig, ...config };
    }
  }

  public saveConfigToLocalStorage() {
    localStorage.setItem(PREVIOUS_GAME_CONFIG_KEY, JSON.stringify({ config: this._config }));
  }
}
