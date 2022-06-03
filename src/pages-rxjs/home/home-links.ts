export interface HomeLink {
  subtitle: string;
  links: {
    display: string;
    url: string;
  }[];
}

export const HOME_LINKS: HomeLink[] = [
  {
    subtitle: 'Para empezar',
    links: [{ display: 'Observable', url: '/comprende-rxjs/observable' }],
  },
  {
    subtitle: 'Transformación',
    links: [
      { display: 'mergeMap', url: '/comprende-rxjs/mergeMap' },
      { display: 'concatMap', url: '/comprende-rxjs/concatMap' },
      { display: 'switchMap', url: '/comprende-rxjs/switchMap' },
      { display: 'exhaustMap', url: '/comprende-rxjs/exhaustMap' },
    ],
  },
  {
    subtitle: 'Unión',
    links: [
      { display: 'combineLatestWith', url: '/comprende-rxjs/combineLatestWith' },
      { display: 'forkJoin', url: '/comprende-rxjs/forkJoin' },
      { display: 'startWith', url: '/comprende-rxjs/startWith' },
      { display: 'endWith', url: '/comprende-rxjs/endWith' },
    ],
  },
  {
    subtitle: 'Tiempo',
    links: [
      { display: 'debounceTime', url: '/comprende-rxjs/debounceTime' },
      { display: 'sampleTime', url: '/comprende-rxjs/sampleTime' },
    ],
  },
];
