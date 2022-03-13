import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { rotateProfilePicture } from './home.animations';

const CHANGE_PICTURE_TIME = 10000; // 10 seconds

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [rotateProfilePicture]
})
export class HomeComponent implements OnInit {
  public years: number;
  private profilePictureAnimationSubscription: ReturnType<typeof setTimeout>;
  public allowRotateProfilePicture = true;
  public stateRotateProfilePicture: 'showPhoto' | 'showLogo' = 'showPhoto';
  public profilePictureIndex = 0;
  public profilePictures: string[] = [
    'assets/home/profile.png',
    'assets/home/jame1.png',
    'assets/home/profile.png',
    'assets/home/jame2.png',
    'assets/home/profile.png',
    'assets/home/jame3.png',
    'assets/home/profile.png',
    'assets/home/jame4.png',
    'assets/home/profile.png',
    'assets/home/jame5.png'
  ];
  public wavePathIndex: number = 0;
  public wavePathTemplates: string[] = [
    'M0,0L0,5C12.5,2.5,12.5,2.5,25,5C37.5,7.5,37.5,7.5,50,10 C62.5,10,62.5,10,75,5C87.5,0,87.5,0,100,2.5L100,0L0,0',
    'M0,0L0,2.5C12.5,5,12.5,5,25,7.5C37.5,10,37.5,10,50,7.5C62.5,5,62.5,5,75,2.5C87.5,0,87.5,0,100,7.5L100,0L0,0',
    'M0,0L0,7.5C12.5,0,12.5,0,25,2.5C37.5,5,37.5,5,50,7.5C62.5,10,62.5,10,75,7.5C87.5,5,87.5,5,100,7.5L100,0L0,0',
    'M0,0L0,10 C12.5,2.5,12.5,0,25,0C37.5,0,37.5,0,50,5C62.5,10,62.5,10,75,10 C87.5,10,87.5,10,100,5L100,0L0,0',
    'M0,0L0,5C12.5,2.5,12.5,2.5,25,5C37.5,7.5,37.5,7.5,50,7.5C62.5,7.5,62.5,7.5,75,5C87.5,2.5,87.5,2.5,100,5L100,0L0,0',
  ];

  public constructor(private readonly _router: Router) { }

  ngOnInit(): void {
    this.years = this.calculateAge(new Date(1996, 10, 15));
    this.startWaveAnimation();
    this.startProfilePictureAnimation();
  }

  startProfilePictureAnimation() {
    this.profilePictureAnimationSubscription = setTimeout(this.changeProfilePicture.bind(this), CHANGE_PICTURE_TIME);
  }

  changeProfilePicture() {
    if (this.allowRotateProfilePicture) {
      this.allowRotateProfilePicture = false;

      // resets the timeout
      clearTimeout(this.profilePictureAnimationSubscription);
      this.startProfilePictureAnimation();

      this.stateRotateProfilePicture = this.stateRotateProfilePicture === 'showLogo' ? 'showPhoto' : 'showLogo';
      if (this.profilePictureIndex === this.profilePictures.length - 1) {
        this.profilePictureIndex = 0;
      } else {
        this.profilePictureIndex++;
      }
    }
  }

  startWaveAnimation() {
    setInterval(() => {
      let randomWavePathIndex;
      do {
        randomWavePathIndex = Math.trunc(Math.random() * this.wavePathTemplates.length);
      } while (randomWavePathIndex == this.wavePathIndex);
      this.wavePathIndex = randomWavePathIndex;
    }, 1000);
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public goToMyTrayectory() {
    this._router.navigate(['mi-trayectoria']);
  }
}
