import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/client";
import { userExist } from "../modules/User/utils/userExist";
import { BadRequestError, UnauthorizedError } from "../utils/api-errors";



const ensureAuthenticaded = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  if(!authorization) {
    throw new BadRequestError('Não Autorizado')
  }

  const token = authorization.split(' ')[1]

  try {
    
    const { id } = verify(token, 'gh9c9hioeyhgiyhewiuhiuy') as { id: string}

    req.id = id

    const user = await prisma.user.findFirst({
      where: {
        id
      }
    })

    if(!user) {
      throw new BadRequestError('Não Autorizado')
    }

    next()
  } catch (error) {
    throw new UnauthorizedError('Token Expirad')
  }
}

export { ensureAuthenticaded }