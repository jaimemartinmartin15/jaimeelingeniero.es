import { ObservableEventType } from './observable-event-type';

export interface ElementInConveyor {
  type: ObservableEventType;
  value: string;
  x: number;
  y: number;
  conveyorId: string;
}
