export enum LineType {
  DAY,
  MONTH,
  YEAR,
}

export interface LineFile {
  lineType: LineType;
  day: number;
  month: number;
  year: number;
  liters: number;
  popUpContent?: string;
}
