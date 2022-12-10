import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOCAL_STORE_KEYS } from 'src/pages-games/local-storage-keys';
import { ROUTING_PATHS } from 'src/pages-games/routing-paths';

@Injectable()
export class PagesGamesNavigationGuard implements CanActivateChild {
  public userAlreadyConfirmedResumeGame: boolean = false;

  public constructor(private readonly router: Router) {}

  /**
   * On first execution (page load) check if there is game in progress.
   *   If there is game in progress, show RESUME_GAME view. Then user will confirm
   *   If there is no game in progress, go to GAME_CONFIG view
   *
   * On next navigations (only possible through buttons in the app) allow all navigations (user already confirmed resume game)
   */
  public canActivateChild(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userAlreadyConfirmedResumeGame) {
      return true;
    }

    if (this.isGameInProgress && !this.userAlreadyConfirmedResumeGame) {
      this.userAlreadyConfirmedResumeGame = true; // user will confirm yes or no
      return this.router.createUrlTree([state.url.split('/')[1], ROUTING_PATHS.RESUME_GAME]);
    }

    this.userAlreadyConfirmedResumeGame = true; // no game in progress, change the flag
    return this.router.createUrlTree([state.url.split('/')[1], ROUTING_PATHS.GAME_CONFIG]);
  }

  private get isGameInProgress(): boolean {
    const lastSavedGameDate = localStorage.getItem(LOCAL_STORE_KEYS.TIME_LAST_GAME);
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    return lastSavedGameDate != null && +lastSavedGameDate > twoHoursAgo;
  }
}
