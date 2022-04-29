import { ObservableEventType } from './observable-event-type';

export interface ElemementInConveyor {
  type: ObservableEventType;
  value: string;
  startAt: number; // percentage
  removeAt?: number; // percentage
  offset: number; // absolute
}

export type PickElementInConveyor = Pick<ElemementInConveyor, 'value' | 'type'>;
