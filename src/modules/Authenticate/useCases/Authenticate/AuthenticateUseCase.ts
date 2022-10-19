import { Prisma } from "@prisma/client";
import { compare } from "bcrypt";
import { BadRequestError } from "../../../../utils/api-errors";
import { userExist } from "../../../User/utils/userExist";
import { TokenGenerator } from "../../utils/TokenGenerator";

export class AuthenticateUseCase {
  async exec(data: Prisma.UserCreateInput) {
    const { username, password } = data
    const login = await userExist(username)

    if(!login) { throw new BadRequestError('E-mail ou senha inválidos')}

    const jwt = await compare(password, login.password)

    if(!jwt) { throw new BadRequestError('E-mail ou senha inválidos')}

    const Generate = new TokenGenerator()

    const token = await Generate.exec(login)

    const {password: _, ...user} = login

    return { user, token }
  }
}