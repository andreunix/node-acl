import { Request, Response } from "express";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController {
  async handler(req: Request, res: Response) {
    const { name, description } = req.body
    
    const create = new CreateProductUseCase()

    const product = await create.exec({name, description})

    return res.status(200).json(product)

  }
}