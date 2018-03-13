import { IOptionResponse } from "./option.interface";

export interface IFieldResponse {
  order: number,
  type: string,
  question: string,
  options: Array<IOptionResponse>,
  value: number,
  multiplier: number,
  maxValue: number,
  disabled: boolean
}
