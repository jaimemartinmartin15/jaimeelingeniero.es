import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  private verbsHits: Verb[] = [];
  public currentVerb: Verb;

  public hits: number = 0;
  public misses: number = 0;

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

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit() {
    this.form = this.formBuilder.group({
      meaning: ['', [Validators.required]],
      infinitive: ['', [Validators.required]],
      past: ['', [Validators.required]],
      participle: ['', [Validators.required]],
    });

    this.verbs = this.activatedRoute.snapshot.data['listOfVerbs'];
  }

  public ngAfterViewInit(): void {
    this.inputs = Array.from(document.querySelectorAll('input'));
    setTimeout(this.generateNewVerbAndResetForm.bind(this));
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

    if (VerbKeysForm.every((key) => this.validation[key] === 'ok')) {
      this.validation.global = 'ok';
      this.hits++;
      this.verbsHits.push(this.currentVerb);
      this.verbs.splice(this.verbs.indexOf(this.currentVerb), 1);
    } else {
      this.validation.global = 'error';
      this.misses++;
    }

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
    if (this.verbs.length == 0) {
      this.verbs = this.verbsHits;
      this.verbsHits = [];
    }

    let random;
    do {
      random = Math.trunc(Math.random() * this.verbs.length);
    } while (this.currentVerb === this.verbs[random] && this.verbs.length > 1);
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
