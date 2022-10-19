import { Prisma } from "@prisma/client";
import { prisma } from "../../../../database/client";
import { BadRequestError } from "../../../../utils/api-errors";

export class CreateRoleUseCase {
  async exec(data: Prisma.RoleCreateInput) {

    const exist = await prisma.role.findFirst({where: {name: data.name}})

    if(exist) { throw new BadRequestError("Role Já Existe")}
    const role = await prisma.role.create({
      data
    })

    return role
  }
}