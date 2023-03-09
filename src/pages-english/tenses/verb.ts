export interface Verb {
  meaning: string;
  infinitive: string;
  past: string;
  participle: string;
}

export const VerbKeysForm = ['meaning', 'infinitive', 'past', 'participle'] as const;
export type VerbKeysFormOfType<T> = Record<keyof Pick<Verb, typeof VerbKeysForm[number]>, T>;