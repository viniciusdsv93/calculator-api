import { GetAllMathResultsImpl } from "../../data/useCases/getAllMathResults/getAllMathResults";
import { MariaDBGetAllMathResultsRepository } from "../../infra/db/mariadb/getAllMathResultsRepository/getAllMathResults";
import { GetAllMathResultsController } from "../../presentation/controllers/getAllMathResults";
import { Controller } from "../../presentation/protocols/controller";

export const makeGetAllMathResultsController = (): Controller => {
	const mariaDBGetAllMathResultsRepository = new MariaDBGetAllMathResultsRepository();
	const getAllMathResultsImpl = new GetAllMathResultsImpl(
		mariaDBGetAllMathResultsRepository
	);
	const getAllMathResultsController = new GetAllMathResultsController(
		getAllMathResultsImpl
	);
	return getAllMathResultsController;
};
