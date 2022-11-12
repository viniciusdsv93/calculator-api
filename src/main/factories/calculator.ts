import { CalculateMathExpressionImpl } from "../../data/useCases/calculateMathExpression/calculate";
import { MariaDBCalculateMathExpressionRepository } from "../../infra/db/mariadb/calculateRepository/calculate";
import { CalculatorController } from "../../presentation/controllers/calculator";
import { Controller } from "../../presentation/protocols/controller";

export const makeCalculatorController = (): Controller => {
	const mariaDBCalculateMathExpressionRepository =
		new MariaDBCalculateMathExpressionRepository();
	const calculateMathExpressionImpl = new CalculateMathExpressionImpl(
		mariaDBCalculateMathExpressionRepository
	);
	const calculatorController = new CalculatorController(calculateMathExpressionImpl);
	return calculatorController;
};
