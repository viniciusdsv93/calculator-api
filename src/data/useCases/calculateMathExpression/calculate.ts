import { evaluate } from "mathjs";
import {
	CalculateMathExpression,
	MathResult,
} from "../../../domain/useCases/calculateMathExpression";

export class CalculateMathExpressionImpl implements CalculateMathExpression {
	async execute(mathExpression: string): Promise<MathResult> {
		const result = await evaluate(mathExpression);

		if (result === Infinity) {
			throw new Error();
		}

		return {
			mathExpression,
			result,
			date: new Date().toLocaleString(),
		};
	}
}
