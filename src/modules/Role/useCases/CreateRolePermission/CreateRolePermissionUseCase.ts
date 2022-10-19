import { Prisma } from '@prisma/client'
import { prisma } from '../../../../database/client'
import { BadRequestError } from '../../../../utils/api-errors'
import { IDRoleExist } from '../../utils/IDRoleExist'
type RolePermissionRequest = {
  roleId: string
  permissions: Prisma.RoleWhereUniqueInput[]
}
export class CreateRolePermissionUseCase {
  async exec({roleId, permissions }: RolePermissionRequest) {
    const role = await IDRoleExist(roleId)

    if(!role) { throw new BadRequestError("Error")}

    let permission:any = []
    permissions.forEach(id => permission.push({id: id}))

    console.log(permission)

    const RolePermission =  await prisma.role.update({
      where: { id: role?.id },
      data: {
        permission: { connect: permission }
      }
    });

    return RolePermission


  }
}