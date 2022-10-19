import { Request, Response } from "express";
import { CreateRolePermissionUseCase } from "./CreateRolePermissionUseCase";

export class CreateRolePermissionController {
  async handler( req: Request, res: Response) {
    const { roleId } = req.params
    const { permissions } = req.body
    console.log(roleId)

    const CreateRolePermission = new CreateRolePermissionUseCase()

    const result = await CreateRolePermission.exec({roleId, permissions})

    return res.status(200).json(result)
  }
}