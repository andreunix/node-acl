import { userExist } from "../../User/utils/userExist";
import { sign } from "jsonwebtoken";
import { Prisma } from "@prisma/client";

import 'dotenv/config';


export class TokenGenerator {
  async exec(data: Prisma.UserCreateInput) {
    const { id } = data

    const token = sign({id: id}, 'gh9c9hioeyhgiyhewiuhiuy', {
      subject: id,
      expiresIn: '1d'
    })

    return token
  }
}