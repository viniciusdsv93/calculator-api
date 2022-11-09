import { CalculateMathExpression } from "../../domain/useCases/calculateMathExpression";
import { MissingParamError } from "../errors/missingParamError";
import { badRequest } from "../helpers/http";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class CalculatorController implements Controller {
	private readonly calculateMathExpression: CalculateMathExpression;

	constructor(calculateMathExpression: CalculateMathExpression) {
		this.calculateMathExpression = calculateMathExpression;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const requiredFields = ["mathExpression"];
		for (const field of requiredFields) {
			if (!httpRequest.body[field]) {
				return badRequest(new MissingParamError(field));
			}
		}

		const result = await this.calculateMathExpression.execute(
			httpRequest.body.mathExpression
		);

		return {
			statusCode: 200,
			body: "ok",
		};
	}
}
