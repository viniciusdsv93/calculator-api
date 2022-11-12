import { MathResultModel } from "../../domain/models/mathResult";
import { GetAllMathResults } from "../../domain/useCases/getAllMathResults";
import { GetAllMathResultsController } from "./getAllMathResults";

const makeGetAllMathResultsImplStub = (): GetAllMathResults => {
	class GetAllMathResultsImplStub implements GetAllMathResults {
		async execute(): Promise<MathResultModel[]> {
			return [];
		}
	}
	return new GetAllMathResultsImplStub();
};

interface SutTypes {
	sut: GetAllMathResultsController;
	getAllMathResultsImplStub: GetAllMathResults;
}

const makeSut = (): SutTypes => {
	const getAllMathResultsImplStub = makeGetAllMathResultsImplStub();
	const sut = new GetAllMathResultsController(getAllMathResultsImplStub);
	return {
		sut,
		getAllMathResultsImplStub,
	};
};

describe("Get All Math Results Controller", () => {
	test("Should call GetAllMathResultsImpl", async () => {
		const { sut, getAllMathResultsImplStub } = makeSut();
		const implSpy = jest.spyOn(getAllMathResultsImplStub, "execute");
		await sut.handle();
		expect(implSpy).toHaveBeenCalled();
	});
});
