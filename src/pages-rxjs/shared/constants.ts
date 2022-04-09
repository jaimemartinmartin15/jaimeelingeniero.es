// next, error, complete, none
export type EventColor = '#0a0' | '#d00' | '#ffdd00' | 'none';

export interface SpeechBubble {
  color: EventColor;
  message: string;
}

export type ObservableEvent = 'next' | 'error' | 'complete';

export interface ElemementInConveyor {
  type: ObservableEvent;
  value: string;
  offset: number;
}
