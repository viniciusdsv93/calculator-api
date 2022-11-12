import { GetAllMathResults } from "../../domain/useCases/getAllMathResults";
import { ok, serverError } from "../helpers/http";
import { Controller } from "../protocols/controller";
import { HttpResponse } from "../protocols/http";

export class GetAllMathResultsController implements Controller {
	private readonly getAllMathResults: GetAllMathResults;

	constructor(getAllMathResults: GetAllMathResults) {
		this.getAllMathResults = getAllMathResults;
	}

	async handle(): Promise<HttpResponse> {
		try {
			const result = await this.getAllMathResults.execute();
			return ok(result);
		} catch (error) {
			return serverError(error as Error);
		}
	}
}
