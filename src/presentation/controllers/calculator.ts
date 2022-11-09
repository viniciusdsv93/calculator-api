export class CalculatorController {
  async handle(httpRequest: any): Promise<any> {
    const requiredFields = ['mathExpression']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return await new Promise(resolve => resolve({
          statusCode: 400,
          body: new Error()
        }))
      }
    }
    
  }
}