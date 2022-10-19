import { Prisma } from "@prisma/client";
import { prisma } from "../../../../database/client";

export class CreateProductUseCase {
  async exec(data: Prisma.ProductCreateInput) {
    const prod = await prisma.product.create({
      data
    })

    return prod
  }
}