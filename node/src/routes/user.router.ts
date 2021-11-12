import express, {Request, Response} from "express";
import { UserRepresentation } from "../representations/user.representation";
import serviceLoaders from "../services";

const userService = serviceLoaders.userService;

const userRouter = express.Router();

userRouter.get("/", async (req:Request, res: Response) => {
    const users: UserRepresentation[] = await userService.findAll();
    res.status(200).send(users);
});

export {
    userRouter
}