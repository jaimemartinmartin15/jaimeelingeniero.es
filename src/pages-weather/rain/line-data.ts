export enum LineType {
  DAY,
  MONTH,
}

export interface LineData {
  lineType: LineType;
  day: number;
  month: number;
  year: number;
  liters: number;
}
