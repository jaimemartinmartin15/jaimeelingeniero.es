import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Verb } from '../verb';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public verbs: Verb[];

  public constructor(private readonly activatedRoute: ActivatedRoute) {}

  public ngOnInit() {
    this.verbs = this.activatedRoute.snapshot.data['listOfVerbs'];
  }
}
