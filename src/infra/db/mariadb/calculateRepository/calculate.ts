import { CalculateMathExpressionRepository } from "../../../../data/protocols/calculateMathExpressionRepository";
import { MathResultModel } from "../../../../domain/models/mathResult";
import { MathResult } from "../../../../domain/useCases/calculateMathExpression";
import { v4 as uuid } from "uuid";
import { pool } from "../helpers/mariadbHelper";

export class MariaDBCalculateMathExpressionRepository
	implements CalculateMathExpressionRepository
{
	async add(mathResult: MathResult): Promise<MathResultModel> {
		const id = uuid();
		const { mathExpression, result, date } = mathResult;
		const sqlQuery =
			"INSERT INTO math_results (id, mathExpression, result, date) VALUES (?, ?, ?, ?)";
		await pool.query(sqlQuery, [id, mathExpression, result, date]);
		const sqlQueryResult = "SELECT * FROM math_results WHERE id = ?";
		const [newMathResult] = await pool.query(sqlQueryResult, id);
		return newMathResult;
	}
}
