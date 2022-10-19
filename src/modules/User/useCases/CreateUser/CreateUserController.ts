import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handler (req: Request, res: Response) {
    const { username, password } = req.body
    const create = new CreateUserUseCase()

    const user = await create.exec({username, password})

    return res.status(201).json(user)
  }
}