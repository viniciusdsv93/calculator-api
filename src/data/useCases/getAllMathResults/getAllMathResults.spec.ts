import { MathResultModel } from "../../../domain/models/mathResult";
import { GetAllMathResultsRepository } from "../../protocols/getAllMathResultsRepository";
import { GetAllMathResultsImpl } from "./getAllMathResults";

const makeGetAllMathResultsRepositoryStub = (): GetAllMathResultsRepository => {
	class GetAllMathResultsRepositoryStub implements GetAllMathResultsRepository {
		async get(): Promise<MathResultModel[]> {
			return [] as MathResultModel[];
		}
	}
	return new GetAllMathResultsRepositoryStub();
};

interface SutTypes {
	sut: GetAllMathResultsImpl;
	getAllMathResultsRepositoryStub: GetAllMathResultsRepository;
}

const makeSut = (): SutTypes => {
	const getAllMathResultsRepositoryStub = makeGetAllMathResultsRepositoryStub();
	const sut = new GetAllMathResultsImpl(getAllMathResultsRepositoryStub);
	return {
		sut,
		getAllMathResultsRepositoryStub,
	};
};

describe("Get All Math Results", () => {
	test("Should call GetAllMathResultsRepository", async () => {
		const { sut, getAllMathResultsRepositoryStub } = makeSut();
		const repositoryStub = jest.spyOn(getAllMathResultsRepositoryStub, "get");
		await sut.execute();
		expect(repositoryStub).toHaveBeenCalled();
	});

	test("Should return an array with all the results saved on the database", async () => {
		const { sut } = makeSut();
		const result = await sut.execute();
		expect(Array.isArray(result)).toBe(true);
	});
});
