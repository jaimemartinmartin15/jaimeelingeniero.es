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
  private currentVerb: Verb;

  public form: FormGroup<{
    meaning: FormControl<string | null>;
    present: FormControl<string | null>;
    past: FormControl<string | null>;
    participle: FormControl<string | null>;
  }>;
  public validation: 'ok' | 'error' | '' = '';

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
      this.generateNewVerb();
    });
  }

  public validate(event: Event) {
    event.preventDefault();

    const values = this.form.value;
    if (
      Object.keys(values).every(
        (key) => this.currentVerb[key as keyof Verb].trim().toLowerCase() === values[key as keyof typeof values]?.trim().toLowerCase()
      )
    ) {
      this.validation = 'ok';
      setTimeout(() => {
        this.generateNewVerb();
        this.validation = '';
      }, 500);
      return;
    }

    this.validation = 'error';
    // TODO show solution
  }

  private generateNewVerb() {
    const random = Math.trunc(Math.random() * this.verbs.length);
    this.currentVerb = this.verbs[random];

    const tenseToShow = Math.trunc(Math.random() * Object.keys(this.currentVerb).length);
    this.form.setValue({
      meaning: tenseToShow === 0 ? this.currentVerb.meaning : '',
      present: tenseToShow === 1 ? this.currentVerb.present : '',
      past: tenseToShow === 2 ? this.currentVerb.past : '',
      participle: tenseToShow === 3 ? this.currentVerb.participle : '',
    });
  }
}
