import { ObservableEventType } from '../../observable-event-type';

export interface ButtonController {
  value: string;
  type: ObservableEventType;
  controllerId: string;
  enabled: boolean;
}
