export class ObservableEventType {
  static readonly NEXT = new ObservableEventType('NEXT', 'next', '#0a0');
  static readonly ERROR = new ObservableEventType('ERROR', 'error', '#d00');
  static readonly COMPLETE = new ObservableEventType('COMPLETE', 'complete', '#ffdd00');
  static readonly NONE = new ObservableEventType('NONE', 'none', '#0000');

  // private to disallow creating other instances of this type
  private constructor(private readonly key: string, public readonly name: string, public readonly color: string) {}

  toString() {
    return this.key;
  }
}
