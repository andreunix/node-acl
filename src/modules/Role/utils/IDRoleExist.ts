import { prisma } from "../../../database/client"
import { Prisma } from "@prisma/client";

export const IDRoleExist = async (id: string): Promise<Prisma.RoleCreateInput| null> => {
  const role = await prisma.role.findFirst({
    where: {
      id
    }
  });
  return role
}
