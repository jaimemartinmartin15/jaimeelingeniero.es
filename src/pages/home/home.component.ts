import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public years: number;

  public constructor(private readonly _router: Router) { }

  ngOnInit(): void {
    this.years = this.calculateAge(new Date(1996, 10, 15));
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
