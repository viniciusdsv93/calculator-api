import { MathResult } from "../../../domain/models/mathResult";
import { CalculateMathExpression } from "../../../domain/useCases/calculateMathExpression";

export class CalculateMathExpressionImpl implements CalculateMathExpression {
	async execute(mathExpression: string): Promise<MathResult> {
		return await new Promise((resolve) =>
			resolve({
				mathExpression,
				result: 10,
				date: new Date().toLocaleString(),
			})
		);
	}
}
