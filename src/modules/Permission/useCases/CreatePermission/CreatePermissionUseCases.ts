import { Prisma } from "@prisma/client";
import { prisma } from "../../../../database/client";
import { BadRequestError } from "../../../../utils/api-errors";

export class CreatePermissionUseCase {
  async exec(data: Prisma.PermissionCreateInput) {

    const exist = await prisma.permission.findFirst({where: {name: data.name}})
    console.log(exist)

    if(exist) { throw new BadRequestError("Role Já Existe")}
    const permission = prisma.permission.create({
      data: {
        name: data.name,
        description: data.description
      }
    })

    return permission
  }
}