import { CalculateMathExpressionImpl } from "./calculate";

interface SutTypes {
	sut: CalculateMathExpressionImpl;
}

const makeSut = (): SutTypes => {
	const sut = new CalculateMathExpressionImpl();
	return {
		sut,
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
});
