import { Request, Response } from "express";
import { CreateRoleUseCase } from "./CreateRoleUseCase";

export class CreateRoleController {
  async handler( req: Request, res: Response ) {
    const { name, description } = req.body
    const create = new CreateRoleUseCase()

    const role = await create.exec({name, description})

    return res.status(201).json(role)
  }
}