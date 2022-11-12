import { MariaDBGetAllMathResultsRepository } from "./getAllMathResults";

describe("MariaDB Repository", () => {
	test("Should return an array of MathResults on success", async () => {
		const sut = new MariaDBGetAllMathResultsRepository();
		const result = await sut.get();
		expect(Array.isArray(result)).toBe(true);
	});
});
