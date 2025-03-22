import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import PaymentController from "../controllers/paymentController";
import PaymentService from "../services/paymentService";

const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

const router: Router = Router();
router.get(
  "/detailId",
  authMiddleware,
  paymentController.getPaymentDetails.bind(paymentController)
);
router.get(
  "/establishmentId",
  authMiddleware,
  paymentController.getPaymentEstablishment.bind(paymentController)
);

export default router;
