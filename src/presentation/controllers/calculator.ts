export class CalculatorController {
  async handle(httpRequest: any): Promise<any> {
    if (!httpRequest.body.mathExpression) {
      return await new Promise(resolve => resolve({
        statusCode: 400,
        body: new Error()
      }))
    }
  }
}