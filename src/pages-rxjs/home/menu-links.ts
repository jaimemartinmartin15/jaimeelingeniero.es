export interface HomeLink {
  subtitle: string;
  links: {
    display: string;
    url: string;
  }[];
}

export const LINKS_TO_START: HomeLink = {
  subtitle: 'Para empezar',
  links: [
    { display: 'Observable', url: '/comprende-rxjs/observable' },
    { display: 'Subject', url: '/comprende-rxjs/subject' },
    { display: 'BehaviorSubject', url: '/comprende-rxjs/behaviorSubject' },
  ],
};

export const LINKS_GROUPS_OPERATORS: HomeLink[] = [
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
      { display: 'auditTime', url: '/comprende-rxjs/auditTime' },
    ],
  },
  {
    subtitle: 'Filtro',
    links: [
      { display: 'distinctUntilChanged', url: '/comprende-rxjs/distinctUntilChanged' },
      { display: 'skip', url: '/comprende-rxjs/skip' },
      { display: 'first', url: '/comprende-rxjs/first' },
      { display: 'take', url: '/comprende-rxjs/take' },
      { display: 'takeUntil', url: '/comprende-rxjs/takeUntil' },
      { display: 'filter', url: '/comprende-rxjs/filter' },
      { display: 'takeWhile', url: '/comprende-rxjs/takeWhile' },
      { display: 'distinct', url: '/comprende-rxjs/distinct' },
    ],
  },
];
