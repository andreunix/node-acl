import { Router } from "express";
import { prisma } from "./database/client";
import { ensureAuthenticaded } from "./middlewares/ensureAuthenticaded";
import { can, is } from "./middlewares/permissions";
import { AuthenticateController } from "./modules/Authenticate/useCases/Authenticate/AuthenticateController";
import { CreatePermissionController } from "./modules/Permission/useCases/CreatePermission/CreatePermissionController";
import { CreateProductController } from "./modules/Product/useCases/CreateProduct/CreateProductController";
import { GetAllProductController } from "./modules/Product/useCases/GetAllProduct/GetAllProductController";
import { CreateRoleController } from "./modules/Role/useCases/CreateRole/CreateRoleController";
import { CreateRolePermissionController } from "./modules/Role/useCases/CreateRolePermission/CreateRolePermissionController";
import { CreateUserController } from "./modules/User/useCases/CreateUser/CreateUserController";
import { CreateUserAccessControlListController } from "./modules/User/useCases/CreateUserAccessControlList/CreateUserAccessControlListController";

const route = Router()

route.post("/create", new CreateUserController().handler)
route.post("/auth", new AuthenticateController().handler)

route.get("/products", new GetAllProductController().handler)

route.post("/products",
  ensureAuthenticaded,
  can(["create_product"]),
  new CreateProductController().handler)

route.post("/roles",
  ensureAuthenticaded,
  is(["admin"]),
  new CreateRoleController().handler)

route.post("/permissions",
  ensureAuthenticaded,
  new CreatePermissionController().handler)

route.post("/acl",
  ensureAuthenticaded,
  new CreateUserAccessControlListController().handler)

route.post("/roles/:roleId", new CreateRolePermissionController().handler)



route.use(ensureAuthenticaded)

route.get("/me", async(req, res) => {
  const user = await prisma.user.findFirst({
    where: { id: req.id}
  })
  console.log(req.id)

  return res.json(user)
})
export { route }