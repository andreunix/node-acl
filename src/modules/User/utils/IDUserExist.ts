import { prisma } from "../../../database/client"
import { Prisma } from "@prisma/client";

export const IDUserExist = async (id: string): Promise<Prisma.UserCreateInput| null> => {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });
  return user
}
