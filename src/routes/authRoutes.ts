import { Router } from "express";
import AuthController from "../controllers/authController";
import UserService from "../services/userService";

const router: Router = Router();

const authService = new UserService();
const authController = new AuthController(authService);

router.post("/login", authController.loginUser.bind(authController));
router.post("/register", authController.registerUser.bind(authController));

export default router;
