import { MathResult } from "../models/mathResult";

export interface CalculateMathExpression {
  execute(mathExpression: string): Promise<MathResult>
}