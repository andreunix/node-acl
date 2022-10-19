import { Request, Response } from "express";
import { CreateUserAccessControlListUseCase } from "./CreateUserAccessControlListUseCase";


export class CreateUserAccessControlListController {
  async handler(req: Request, res: Response) {
    const { roles, permissions } = req.body
    const id = req.id

    const CreateUserAccessControlList = new CreateUserAccessControlListUseCase()

    const {password: _, ...user} = await CreateUserAccessControlList.exec({id, roles, permissions})

    return res.status(200).json(user)
  }

}