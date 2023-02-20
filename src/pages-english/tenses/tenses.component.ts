import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Verb } from './verb';

@Component({
  selector: 'app-tenses',
  templateUrl: './tenses.component.html',
  styleUrls: ['./tenses.component.scss'],
})
export class TensesComponent implements OnInit {
  private verbs: Verb[];
  public currentVerb: Verb;

  public form: FormGroup<{
    meaning: FormControl<string | null>;
    infinitive: FormControl<string | null>;
    past: FormControl<string | null>;
    participle: FormControl<string | null>;
  }>;
  public validation: {
    meaning: 'ok' | 'error' | '';
    infinitive: 'ok' | 'error' | '';
    past: 'ok' | 'error' | '';
    participle: 'ok' | 'error' | '';
    global: 'ok' | 'error' | '';
    showMoreSolutions: boolean;
  } = {
    meaning: '',
    infinitive: '',
    past: '',
    participle: '',
    global: '',
    showMoreSolutions: false,
  };

  public constructor(private readonly formBuilder: FormBuilder, private readonly http: HttpClient) {}

  public ngOnInit() {
    this.form = this.formBuilder.group({
      meaning: ['', [Validators.required]],
      infinitive: ['', [Validators.required]],
      past: ['', [Validators.required]],
      participle: ['', [Validators.required]],
    });

    this.http.get<Verb[]>('/pages-english/tenses/assets/verbs.json').subscribe((verbs) => {
      this.verbs = verbs;
      this.generateNewVerb();
    });

    // TODO meta tags
  }

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler() {
    if (this.validation.global !== '') {
      this.nextVerb();
    }
  }

  public validate(event: Event) {
    event.preventDefault();
    // hides keyboard
    (document.activeElement as HTMLInputElement).blur();

    const formValues = this.form.value;
    Object.keys(this.currentVerb).forEach((key) => {
      if (
        // TODO check acents => oir != oír
        this.currentVerb[key as keyof Verb]
          .toLowerCase()
          .trim()
          .split('/')
          .some((solution) =>
            formValues[key as keyof Verb]
              ?.toLocaleLowerCase()
              .trim()
              .split('/')
              .map((v) => v.trim())
              .includes(solution)
          )
      ) {
        this.validation[key as keyof Verb] = 'ok';
      } else {
        this.validation[key as keyof Verb] = 'error';
      }
    });

    if (
      this.validation.meaning === 'ok' &&
      this.validation.infinitive === 'ok' &&
      this.validation.past === 'ok' &&
      this.validation.participle === 'ok'
    ) {
      this.validation.global = 'ok';
    } else {
      this.validation.global = 'error';
    }

    this.validation.showMoreSolutions = Object.values(this.currentVerb).some((solutions) => solutions.includes('/'));

    this.form.disable();
  }

  public nextVerb() {
    this.validation = {
      meaning: '',
      infinitive: '',
      past: '',
      participle: '',
      global: '',
      showMoreSolutions: false,
    };
    this.generateNewVerb();
    this.form.enable();
  }

  private generateNewVerb() {
    let random;
    do {
      random = Math.trunc(Math.random() * this.verbs.length);
    } while (this.currentVerb === this.verbs[random]);
    this.currentVerb = this.verbs[random];

    const tenseToShow = Math.trunc(Math.random() * Object.keys(this.currentVerb).length);
    this.form.setValue({
      meaning: tenseToShow === 0 ? this.currentVerb.meaning : '',
      infinitive: tenseToShow === 1 ? this.currentVerb.infinitive : '',
      past: tenseToShow === 2 ? this.currentVerb.past : '',
      participle: tenseToShow === 3 ? this.currentVerb.participle : '',
    });
  }
}
