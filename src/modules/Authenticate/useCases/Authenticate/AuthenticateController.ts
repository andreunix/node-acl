import { Request, Response } from "express";
import { AuthenticateUseCase } from "./AuthenticateUseCase";

export class AuthenticateController {
  async handler(req: Request, res: Response) {
    const { username, password } = req.body

    const Authenticator = new AuthenticateUseCase()

    const auth = await Authenticator.exec({ username, password})

    return res.status(201).json(auth)
  }
}