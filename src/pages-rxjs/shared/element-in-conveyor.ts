import { ObservableEventType } from './observable-event-type';

export interface ElemementInConveyor2 {
  type: ObservableEventType;
  value: string;
  startAt: number; // percentage
  removeAt?: number; // percentage
  offset: number; // absolute
}

export type PickElementInConveyor = Pick<ElemementInConveyor2, 'value' | 'type'>;

export interface ElementInConveyor {
  type: ObservableEventType;
  value: string;
  x: number;
  y: number;
  conveyorId: string;
}
