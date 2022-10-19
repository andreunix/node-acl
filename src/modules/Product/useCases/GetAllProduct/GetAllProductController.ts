import { prisma } from "../../../../database/client"
import { Request, Response } from "express";

export class GetAllProductController {
  async handler(req: Request, res: Response) {
    const data = await prisma.product.findMany()
    return res.status(200).json(data)
   
  }
}