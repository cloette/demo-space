import { IFormResponse } from "./form.interface";

export interface IItemResponse {
  address: string,
  addressID: string,
  score: number,
  form: IFormResponse,
  formid: string
}
