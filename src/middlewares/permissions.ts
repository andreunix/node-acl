import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/client";
import { UnauthorizedError } from "../utils/api-errors";

export function can(permissionsRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req

    const user = await prisma.user.findFirst({
      where: { id },
      include: {permission: true}
    });

    if(!user) { throw new UnauthorizedError("não permitido")}

    const permissionExist = user.permission
    .map((permission) => permission.name)
    .some((permission) => permissionsRoutes.includes(permission) )

    if(!permissionExist) { throw new UnauthorizedError("não permitido")}

    next()

  }
}

export function is(rolesRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req

    const user = await prisma.user.findFirst({
      where: { id },
      include: {roles: true}
    });

    if(!user) { throw new UnauthorizedError("não permitido")}

    const rolesExist = user.roles
    .map((role) => role.name)
    .some((role) => rolesRoutes.includes(role) )

    if(!rolesExist) { throw new UnauthorizedError("não permitido")}

    next()

  }
}