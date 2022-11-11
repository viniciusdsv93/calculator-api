export interface MathResult {
	mathExpression: string;
	result: number;
	date: string;
}

export interface CalculateMathExpression {
	execute(mathExpression: string): Promise<MathResult>;
}
