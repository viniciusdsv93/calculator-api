import {
	CalculateMathExpression,
	MathResult,
} from "../../domain/useCases/calculateMathExpression";
import { MissingParamError } from "../errors/missingParamError";
import { ServerError } from "../errors/serverError";
import { badRequest, ok, serverError } from "../helpers/http";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { CalculatorController } from "./calculator";

const makeCalculator = (): CalculateMathExpression => {
	class CalculateMathExpressionStub implements CalculateMathExpression {
		async execute(mathExpression: string): Promise<MathResult> {
			return {
				mathExpression,
				result: 5,
				date: new Date().toLocaleString(),
			};
		}
	}
	return new CalculateMathExpressionStub();
};

const makeFakeRequest = (): HttpRequest => {
	return {
		body: {
			mathExpression: "5 + 5",
		},
	};
};

const makeFakeResult = () => {
	return {
		mathExpression: "5 + 5",
		result: 10,
		date: new Date(),
	};
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
		await sut.handle(makeFakeRequest());
		expect(calculatorSpy).toHaveBeenCalledWith("5 + 5");
	});

	test("Should return 500 if CalculateMathExpression throws", async () => {
		const { sut, calculatorStub } = makeSut();
		jest.spyOn(calculatorStub, "execute").mockImplementationOnce(() => {
			throw new Error();
		});
		const httpResponse = await sut.handle(makeFakeRequest());
		expect(httpResponse).toEqual(serverError(new ServerError("")));
	});

	// test("Should return 200 on success", async () => {
	// 	const { sut } = makeSut();
	// 	const httpResponse = await sut.handle(makeFakeRequest());
	// 	expect(httpResponse).toEqual(ok(makeFakeResult()));
	// });
});
