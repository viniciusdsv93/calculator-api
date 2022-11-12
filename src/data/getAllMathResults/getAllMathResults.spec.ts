import { MathResultModel } from "../../domain/models/mathResult";
import { GetAllMathResultsRepository } from "../protocols/getAllMathResultsRepository";
import { GetAllMathResultsImpl } from "./getAllMathResults";

describe("Get All Math Results", () => {
	test("Should call GetAllMathResultsRepository", async () => {
		class GetAllMathResultsRepositoryStub implements GetAllMathResultsRepository {
			async get(): Promise<MathResultModel[]> {
				return [] as MathResultModel[];
			}
		}
		const getAllMathResultsRepositoryStub = new GetAllMathResultsRepositoryStub();
		const sut = new GetAllMathResultsImpl(getAllMathResultsRepositoryStub);
		const repositoryStub = jest.spyOn(getAllMathResultsRepositoryStub, "get");
		const result = await sut.execute();
		expect(repositoryStub).toHaveBeenCalled();
	});

	// test("Should return an array with all the results saved on the database", async () => {
	// 	const sut = new GetAllMathResultsImpl();
	// 	const result = await sut.execute();
	// 	expect(result).toBeTruthy();
	// });
});
