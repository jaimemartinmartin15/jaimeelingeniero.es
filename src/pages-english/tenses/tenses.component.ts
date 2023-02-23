import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { normalizeString } from 'src/utils/strings';
import { Verb, VerbKeysForm, VerbKeysFormOfType } from './verb';

@Component({
  selector: 'app-tenses',
  templateUrl: './tenses.component.html',
  styleUrls: ['./tenses.component.scss'],
})
export class TensesComponent implements OnInit, AfterViewInit {
  private inputs: HTMLInputElement[];

  private verbs: Verb[];
  public currentVerb: Verb;

  public form: FormGroup<VerbKeysFormOfType<FormControl<string | null>>>;
  public validation: VerbKeysFormOfType<'ok' | 'error' | ''> & {
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
      this.generateNewVerbAndResetForm();
    });

    // TODO meta tags
  }

  public ngAfterViewInit(): void {
    this.inputs = Array.from(document.querySelectorAll('input'));
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

    const formValues = this.form.getRawValue();
    VerbKeysForm.forEach((key) => {
      const enteredValues = formValues[key]?.split('/').map((v) => normalizeString(v))!;
      const correctValues = this.currentVerb[key].split('/').map((v) => normalizeString(v));
      this.validation[key] = enteredValues.every((answer) => correctValues.includes(answer)) ? 'ok' : 'error';

      this.validation.showMoreSolutions = this.validation.showMoreSolutions || !correctValues.every((v) => enteredValues.includes(v));
    });

    this.validation.global = VerbKeysForm.every((key) => this.validation[key] === 'ok') ? 'ok' : 'error';

    this.form.disable();
  }

  public nextVerb() {
    this.form.enable();
    this.validation = {
      meaning: '',
      infinitive: '',
      past: '',
      participle: '',
      global: '',
      showMoreSolutions: false,
    };
    this.generateNewVerbAndResetForm();
  }

  private generateNewVerbAndResetForm() {
    let random;
    do {
      random = Math.trunc(Math.random() * this.verbs.length);
    } while (this.currentVerb === this.verbs[random]);
    this.currentVerb = this.verbs[random];

    const tenseToShow = VerbKeysForm[Math.floor(Math.random() * VerbKeysForm.length)];
    this.form.setValue({
      meaning: tenseToShow === 'meaning' ? this.currentVerb.meaning : '',
      infinitive: tenseToShow === 'infinitive' ? this.currentVerb.infinitive : '',
      past: tenseToShow === 'past' ? this.currentVerb.past : '',
      participle: tenseToShow === 'participle' ? this.currentVerb.participle : '',
    });
    this.form.get(tenseToShow)?.disable();

    // set focus on first disabled input
    this.inputs.find((i) => i.getAttribute('formcontrolname') !== tenseToShow)?.focus();
  }
}
