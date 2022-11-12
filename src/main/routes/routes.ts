import { Router } from "express";
import { expressAdaptRoute } from "../adapters/expressRouteAdapter";
import { makeCalculatorController } from "../factories/calculator";

const router = Router();

router.post("/calculate", expressAdaptRoute(makeCalculatorController()));
router.get("/test", (req, res) => res.json("working"));

export { router };
