import { CalculateMathExpressionRepository } from "../../../../data/protocols/calculateMathExpressionRepository";
import { MathResultModel } from "../../../../domain/models/mathResult";
import { MathResult } from "../../../../domain/useCases/calculateMathExpression";
import { uuid } from "uuidv4";
import { pool } from "../helpers/mariadbHelper";

export class MariaDBCalculateMathExpressionRepository
	implements CalculateMathExpressionRepository
{
	async add(mathResult: MathResult): Promise<MathResultModel> {
		const id = uuid();
		const { mathExpression, result, date } = mathResult;
		const sqlQuery =
			"INSERT INTO math_results (id, mathExpression, result, date) VALUES (?, ?, ?, ?)";
		const queryResult = await pool.query(sqlQuery, [
			id,
			mathExpression,
			result,
			date,
		]);
		console.log("queryResult", queryResult);
		return queryResult;
	}
}
