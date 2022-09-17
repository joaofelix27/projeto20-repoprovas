import { Router } from "express";
import * as testsController from "../controllers/testsController";
import { validateSchema } from "../middlewares/genericSchemaMiddleware";
import validateUser from "../middlewares/validateUserMiddleware";
import { testSchema } from "../schemas/testsSchemas/testSchema";

const testsRouter= Router();

testsRouter.post("/tests/create",validateSchema(testSchema),validateUser,testsController.createTest)
testsRouter.get("/tests",validateUser,testsController.getTestByDiscipline)

export default testsRouter;