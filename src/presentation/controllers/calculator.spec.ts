import { MissingParamError } from "../errors/missingParamError";
import { badRequest } from "../helpers/http";
import { CalculatorController } from "./calculator";

describe('Calculator Controller', () => {

  test('Should return an error if no math expression is provided', async () => {
    const sut = new CalculatorController()
    const httpRequest = {
      body: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('mathExpression')))
  });
})