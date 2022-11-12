import { Router } from "express";
import { expressAdaptRoute } from "../adapters/expressRouteAdapter";
import { makeCalculatorController } from "../factories/calculator";
import { makeGetAllMathResultsController } from "../factories/getAllMathResults";

const router = Router();

router.get("/results", expressAdaptRoute(makeGetAllMathResultsController()));
router.post("/calculate", expressAdaptRoute(makeCalculatorController()));

export { router };
