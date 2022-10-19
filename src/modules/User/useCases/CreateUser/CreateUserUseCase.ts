import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../../../../database/client";
import { BadRequestError } from "../../../../utils/api-errors";
import { userExist } from "../../utils/userExist";

export class CreateUserUseCase {
  async exec (data: Prisma.UserCreateInput) {
    const { username, password } = data
    const user = await userExist(username)

    if(user) { throw new BadRequestError('username invalido ')}

    const pass = await hash(password, 10)

    const create = await prisma.user.create({
      data:{
        username,
        password: pass
      }
    })

    const { password: _, ...CreateUser} = create

    return CreateUser
  }
}