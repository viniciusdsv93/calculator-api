import { MathResultModel } from "../../domain/models/mathResult";
import { MathResult } from "../../domain/useCases/calculateMathExpression";

export interface CalculateMathExpressionRepository {
	add(mathResult: MathResult): Promise<MathResultModel>;
}
