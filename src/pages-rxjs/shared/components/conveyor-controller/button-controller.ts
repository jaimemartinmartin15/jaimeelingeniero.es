import { ObservableEventType } from '../../observable-event-type';

export interface ButtonController {
  value: string;
  type: ObservableEventType;
  enabled?: boolean;
  controllerId?: string;
}
