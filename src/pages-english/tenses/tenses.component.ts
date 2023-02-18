import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Verb } from './verb';

@Component({
  selector: 'app-tenses',
  templateUrl: './tenses.component.html',
  styleUrls: ['./tenses.component.scss'],
})
export class TensesComponent implements OnInit {
  private verbs: Verb[];

  public form: FormGroup<{
    meaning: FormControl<string | null>;
    present: FormControl<string | null>;
    past: FormControl<string | null>;
    participle: FormControl<string | null>;
  }>;

  public constructor(private readonly formBuilder: FormBuilder, private readonly http: HttpClient) {}

  public ngOnInit() {
    this.form = this.formBuilder.group({
      meaning: ['', [Validators.required]],
      present: ['', [Validators.required]],
      past: ['', [Validators.required]],
      participle: ['', [Validators.required]],
    });

    this.http.get<Verb[]>('/pages-english/tenses/assets/verbs.json').subscribe((verbs) => {
      this.verbs = verbs;

      // TODO start game populating fields
    });
  }

  public validate(event: Event) {
    event.preventDefault();

    // TODO pick values and validate
    console.log('jaime validating', event);
  }
}
