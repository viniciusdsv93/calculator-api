import { MathResultModel } from "../../../domain/models/mathResult";
import { MathResult } from "../../../domain/useCases/calculateMathExpression";
import { CalculateMathExpressionRepository } from "../../protocols/calculateMathExpressionRepository";
import { CalculateMathExpressionImpl } from "./calculate";

const makeCalculateMathExpressionRepositoryStub =
	(): CalculateMathExpressionRepository => {
		class CalculateMathExpressionRepositoryStub
			implements CalculateMathExpressionRepository
		{
			async add(mathResult: MathResult): Promise<MathResultModel> {
				return new Promise((resolve) => resolve(makeMathResultModel()));
			}
		}
		return new CalculateMathExpressionRepositoryStub();
	};

const makeMathResultModel = (): MathResultModel => {
	return {
		id: "1",
		mathExpression: "5 + 5",
		result: 10,
		date: new Date().toLocaleString(),
	};
};

interface SutTypes {
	sut: CalculateMathExpressionImpl;
	calculateMathExpressionRepositoryStub: CalculateMathExpressionRepository;
}

const makeSut = (): SutTypes => {
	const calculateMathExpressionRepositoryStub =
		makeCalculateMathExpressionRepositoryStub();
	const sut = new CalculateMathExpressionImpl(calculateMathExpressionRepositoryStub);
	return {
		sut,
		calculateMathExpressionRepositoryStub,
	};
};

describe("Calculate Math Expression", () => {
	test("Should return an error if invalid value is provided", async () => {
		const { sut } = makeSut();
		const response = sut.execute("10 + 10 / (2 + b)");
		await expect(response).rejects.toThrow();
	});

	test("Should return an error when trying to divide by zero", async () => {
		const { sut } = makeSut();
		const response = sut.execute("10 + 10 / 0");
		await expect(response).rejects.toThrow();
	});

	test("Should return the correct result according to the math expression provided", async () => {
		const { sut } = makeSut();
		const response = await sut.execute("10 + 10");
		expect(response).toEqual({
			mathExpression: "10 + 10",
			result: 20,
			date: new Date().toLocaleString(),
		});
	});

	test("Should return the correct result when using parenthesis", async () => {
		const { sut } = makeSut();
		const response = await sut.execute("10 + 10 - (2 + 3)");
		expect(response).toEqual({
			mathExpression: "10 + 10 - (2 + 3)",
			result: 15,
			date: new Date().toLocaleString(),
		});
	});

	test("Should return the correct result when using multiplication", async () => {
		const { sut } = makeSut();
		const response = await sut.execute("10 + 10 * (2 + 3)");
		expect(response).toEqual({
			mathExpression: "10 + 10 * (2 + 3)",
			result: 60,
			date: new Date().toLocaleString(),
		});
	});

	test("Should return the correct result when using division", async () => {
		const { sut } = makeSut();
		const response = await sut.execute("10 + 10 / (2 + 3)");
		expect(response).toEqual({
			mathExpression: "10 + 10 / (2 + 3)",
			result: 12,
			date: new Date().toLocaleString(),
		});
	});

	test("Should call CalculateMathExpressionRepository with the correct values", async () => {
		const { sut, calculateMathExpressionRepositoryStub } = makeSut();
		const repositorySpy = jest.spyOn(calculateMathExpressionRepositoryStub, "add");
		await sut.execute("5 + 5");
		expect(repositorySpy).toHaveBeenCalledWith({
			mathExpression: "5 + 5",
			result: 10,
			date: new Date().toLocaleString(),
		});
	});
});
