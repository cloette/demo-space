import { IFieldResponse } from "./field.interface";

export interface IFormResponse {
	id: string,
	fields: Array<IFieldResponse>
}
