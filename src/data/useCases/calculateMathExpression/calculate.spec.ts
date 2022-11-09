import { CalculateMathExpressionImpl } from "./calculate";

describe("Calculate Math Expression", () => {
	test("Should return the correct result according to the math expression provided", async () => {
		const sut = new CalculateMathExpressionImpl();
		const response = await sut.execute("5 + 5");
		expect(response).toEqual({
			mathExpression: "5 + 5",
			result: 10,
			date: new Date().toLocaleString(),
		});
	});
});
