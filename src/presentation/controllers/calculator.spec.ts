import { MathResult } from "../../domain/models/mathResult";
import { CalculateMathExpression } from "../../domain/useCases/calculateMathExpression";
import { MissingParamError } from "../errors/missingParamError";
import { ServerError } from "../errors/serverError";
import { badRequest, serverError } from "../helpers/http";
import { HttpRequest } from "../protocols/http";
import { CalculatorController } from "./calculator";

const makeCalculator = (): CalculateMathExpression => {
	class CalculateMathExpressionStub implements CalculateMathExpression {
		async execute(mathExpression: string): Promise<MathResult> {
			return {
				mathExpression,
				result: 5,
				date: new Date(),
			};
		}
	}
	return new CalculateMathExpressionStub();
};

interface SutTypes {
	sut: CalculatorController;
	calculatorStub: CalculateMathExpression;
}

const makeSut = (): SutTypes => {
	const calculatorStub = makeCalculator();
	const sut = new CalculatorController(calculatorStub);
	return {
		sut,
		calculatorStub,
	};
};

describe("Calculator Controller", () => {
	test("Should return an error if no math expression is provided", async () => {
		const { sut } = makeSut();
		const httpRequest = {
			body: {},
		};
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse).toEqual(badRequest(new MissingParamError("mathExpression")));
	});

	test("Should call CalculateMathExpression with the correct parameter", async () => {
		const { sut, calculatorStub } = makeSut();
		const calculatorSpy = jest.spyOn(calculatorStub, "execute");
		const httpRequest = {
			body: {
				mathExpression: "5 + 5",
			},
		};
		await sut.handle(httpRequest);
		expect(calculatorSpy).toHaveBeenCalledWith("5 + 5");
	});

	test("Should return 500 if CalculateMathExpression throws", async () => {
		const { sut, calculatorStub } = makeSut();
		jest.spyOn(calculatorStub, "execute").mockImplementationOnce(() => {
			throw new Error();
		});
		const httpRequest = {
			body: {
				mathExpression: "5 + 5",
			},
		};
		const httpResponse = await sut.handle(httpRequest);
		expect(httpResponse).toEqual(serverError(new ServerError("")));
	});
});
