import { ObservableEventType } from './observable-event-type';

export interface SpeechBubble {
  type: ObservableEventType;
  message: string;
}
