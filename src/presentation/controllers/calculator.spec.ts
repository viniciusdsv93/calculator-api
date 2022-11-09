import { CalculatorController } from "./calculator";

describe('Calculator Controller', () => {

  test('Should return an error if no math expression is provided', async () => {
    const sut = new CalculatorController()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error())
  });
})