import { Router } from "express";
import * as authControllers from "../controllers/authController";
import { validateSchema } from "../middlewares/genericSchemaMiddleware";
import {signInSchema} from "../schemas/authSchemas/sIgnInSchema";
import { signUpSchema } from "../schemas/authSchemas/signUpSchema";

const usersRouter= Router();

usersRouter.post("/sign-up",validateSchema(signUpSchema),authControllers.register)
usersRouter.post("/sign-in",validateSchema(signInSchema),authControllers.login)

export default usersRouter;