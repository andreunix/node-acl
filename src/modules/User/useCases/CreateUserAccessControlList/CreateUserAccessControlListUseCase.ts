import { Prisma } from "@prisma/client"
import { prisma } from "../../../../database/client"
import { BadRequestError } from "../../../../utils/api-errors"
import { IDUserExist } from "../../utils/IDUserExist"

type UserACLRequest = {
  id: string
  roles: Prisma.RoleWhereUniqueInput[]
  permissions: Prisma.PermissionWhereUniqueInput[]
}

export class CreateUserAccessControlListUseCase {
  async exec({id, roles, permissions}:UserACLRequest) {
    const user = await IDUserExist(id)
    if(!user) { throw new BadRequestError("Error")}
    let role:any = []
    let permission:any= []

    roles.forEach(id => role.push({id: id}))
    permissions.forEach(id => permission.push({id: id}))

    console.log(roles, permissions)
    const access = await prisma.user.update({
      where:{ id: user.id},
      data: {
        roles: { connect: role },
        permission: { connect: permission }
      },
      include: {
        roles: true,
        permission: true
      }
    });

    return access


  }
}