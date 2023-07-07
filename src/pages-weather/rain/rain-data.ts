export interface RainData {
  date: Date;
  liters: number;
  popUpContent?: string;
  svgOffset: number;
  isFake: boolean; // means liters is set to 0 because there is no data
}
