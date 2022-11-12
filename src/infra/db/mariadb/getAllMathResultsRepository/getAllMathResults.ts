import { GetAllMathResultsRepository } from "../../../../data/protocols/getAllMathResultsRepository";
import { MathResultModel } from "../../../../domain/models/mathResult";
import { pool } from "../helpers/mariadbHelper";

export class MariaDBGetAllMathResultsRepository implements GetAllMathResultsRepository {
	async get(): Promise<MathResultModel[]> {
		const sqlQuery = "SELECT * FROM math_results";
		const result = await pool.query(sqlQuery);
		return result;
	}
}
