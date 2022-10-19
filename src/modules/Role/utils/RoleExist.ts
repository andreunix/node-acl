import { prisma } from "../../../database/client"
import { Prisma } from "@prisma/client";

export const RoleExist = async (name: string): Promise<Prisma.RoleCreateInput| null> => {
  const role = await prisma.role.findFirst({
    where: {
      name
    }
  });
  return role
}
