export interface RainData {
  date: Date;
  liters: number;
  svgOffset: number;
  isFake: boolean; // means liters is set to 0 because there is no data
}
