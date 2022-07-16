import { HomeLink } from './links-group';

export const HOME_LINKS_TO_START: HomeLink = {
  subtitle: 'Para empezar',
  links: [{ display: 'Observable', url: '/observable' }],
};

export const HOME_LINKS_GROUPS: HomeLink[] = [
  {
    subtitle: 'Transformación',
    links: [
      { display: 'mergeMap', url: '/mergeMap' },
      { display: 'concatMap', url: '/concatMap' },
      { display: 'switchMap', url: '/switchMap' },
      { display: 'exhaustMap', url: '/exhaustMap' },
    ],
  },
  {
    subtitle: 'Unión',
    links: [
      {
        display: 'combineLatestWith',
        url: '/combineLatestWith',
      },
      { display: 'forkJoin', url: '/forkJoin' },
      { display: 'startWith', url: '/startWith' },
      { display: 'endWith', url: '/endWith' },
    ],
  },
  {
    subtitle: 'Tiempo',
    links: [
      { display: 'debounceTime', url: '/debounceTime' },
      { display: 'sampleTime', url: '/sampleTime' },
      { display: 'auditTime', url: '/auditTime' },
    ],
  },
  {
    subtitle: 'Filtro',
    links: [
      {
        display: 'distinctUntilChanged',
        url: '/distinctUntilChanged',
      },
      { display: 'skip', url: '/skip' },
      { display: 'first', url: '/first' },
      { display: 'take', url: '/take' },
      { display: 'takeUntil', url: '/takeUntil' },
      { display: 'filter', url: '/filter' },
      { display: 'takeWhile', url: '/takeWhile' },
      { display: 'distinct', url: '/distinct' },
    ],
  },
];
