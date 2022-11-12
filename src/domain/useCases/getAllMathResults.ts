import { MathResultModel } from "../models/mathResult";

export interface GetAllMathResults {
	execute(): Promise<MathResultModel[]>;
}
