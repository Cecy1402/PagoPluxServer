import { Request, Response } from "express";
import authService from "../services/userService";
import { StatusCodes } from "http-status-codes";
import UserService from "../services/userService";

class AuthController {
  private authService: UserService;

  constructor(authService: UserService) {
    this.authService = authService;
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    const { name, email, status, password } = req.body;
    try {
      await this.authService.registerUser(name, email, status, password);
      await this.authService.authenticateUser(email, password);

      res.status(StatusCodes.CREATED).json({
        message: "User registered successfully",
      });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Error registering user" });
    }
  }

  public async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const { token } = await this.authService.authenticateUser(
        email,
        password
      );
      res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
    }
  }
}
export default AuthController;
