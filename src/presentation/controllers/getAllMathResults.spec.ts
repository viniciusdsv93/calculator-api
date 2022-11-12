import { MathResultModel } from "../../domain/models/mathResult";
import { GetAllMathResults } from "../../domain/useCases/getAllMathResults";
import { GetAllMathResultsController } from "./getAllMathResults";

describe("Get All Math Results Controller", () => {
	test("Should call GetAllMathResultsImpl", async () => {
		class GetAllMathResultsImplStub implements GetAllMathResults {
			async execute(): Promise<MathResultModel[]> {
				return [];
			}
		}
		const getAllMathResultsImplStub = new GetAllMathResultsImplStub();
		const sut = new GetAllMathResultsController(getAllMathResultsImplStub);
		const implSpy = jest.spyOn(getAllMathResultsImplStub, "execute");
		await sut.handle();
		expect(implSpy).toHaveBeenCalled();
	});
});
