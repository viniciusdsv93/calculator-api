import { MariaDBCalculateMathExpressionRepository } from "./calculate";

describe("MariaDB Repository", () => {
	test("Should return a MathResultModel on success", async () => {
		const sut = new MariaDBCalculateMathExpressionRepository();
		const result = await sut.add({
			mathExpression: "5 + 5",
			result: 10,
			date: new Date().toLocaleString(),
		});
		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("mathExpression", "5 + 5");
		expect(result).toHaveProperty("result", "10");
		expect(result).toHaveProperty("date");
	});
});
