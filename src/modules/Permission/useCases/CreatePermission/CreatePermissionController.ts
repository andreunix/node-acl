import { Request, Response } from "express";
import { CreatePermissionUseCase } from "./CreatePermissionUseCases";

export class CreatePermissionController {
  async handler( req: Request, res: Response ) {
    const { name, description } = req.body
    const create = new CreatePermissionUseCase()

    const permission = await  create.exec({name, description})

    return res.status(201).json(permission)
  }
}