import { MathResultModel } from "../../../domain/models/mathResult";
import { GetAllMathResults } from "../../../domain/useCases/getAllMathResults";
import { GetAllMathResultsRepository } from "../../protocols/getAllMathResultsRepository";

export class GetAllMathResultsImpl implements GetAllMathResults {
	private readonly getAllMathResultsRepository: GetAllMathResultsRepository;

	constructor(getAllMathResultsRepository: GetAllMathResultsRepository) {
		this.getAllMathResultsRepository = getAllMathResultsRepository;
	}

	async execute(): Promise<MathResultModel[]> {
		const result = await this.getAllMathResultsRepository.get();
		return result;
	}
}
