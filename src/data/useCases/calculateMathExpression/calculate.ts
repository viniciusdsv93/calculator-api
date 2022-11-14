import { evaluate } from "mathjs";
import {
	CalculateMathExpression,
	MathResult,
} from "../../../domain/useCases/calculateMathExpression";
import { CalculateMathExpressionRepository } from "../../protocols/calculateMathExpressionRepository";

export class CalculateMathExpressionImpl implements CalculateMathExpression {
	private readonly calculateMathExpressionRepository: CalculateMathExpressionRepository;

	constructor(calculateMathExpressionRepository: CalculateMathExpressionRepository) {
		this.calculateMathExpressionRepository = calculateMathExpressionRepository;
	}

	async execute(mathExpression: string): Promise<MathResult> {
		const result = await evaluate(mathExpression);

		if (result === Infinity) {
			throw new Error();
		}

		const mathResult = {
			mathExpression,
			result,
			date: new Date().toLocaleString(),
		};

		const queryResult = await this.calculateMathExpressionRepository.add(mathResult);

		return queryResult;
	}
}
