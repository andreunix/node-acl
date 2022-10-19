import { prisma } from "../../../database/client"
import { Prisma } from "@prisma/client";

export const userExist = async (usuario: string): Promise<Prisma.UserCreateInput| null> => {
  const user = await prisma.user.findFirst({
    where: {
      username: usuario,
    }
  });
  return user
}
