import { CalculateMathExpression } from "../../domain/useCases/calculateMathExpression";
import { MissingParamError } from "../errors/missingParamError";
import { badRequest, created, ok, serverError } from "../helpers/http";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http";

export class CalculatorController implements Controller {
	private readonly calculateMathExpression: CalculateMathExpression;

	constructor(calculateMathExpression: CalculateMathExpression) {
		this.calculateMathExpression = calculateMathExpression;
	}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const requiredFields = ["mathExpression"];
			for (const field of requiredFields) {
				if (!httpRequest.body[field]) {
					return badRequest(new MissingParamError(field));
				}
			}

			const result = await this.calculateMathExpression.execute(
				httpRequest.body.mathExpression
			);

			return created(result);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
