import { MathResultModel } from "../../domain/models/mathResult";

export interface GetAllMathResultsRepository {
	get(): Promise<MathResultModel[]>;
}
