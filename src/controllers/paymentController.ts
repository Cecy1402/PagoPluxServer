import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import PaymentService from "../services/paymentService";

class PaymentController {
  private paymentService: PaymentService;

  constructor(paymentService: PaymentService) {
    this.paymentService = paymentService;
  }

  public async getPaymentDetails(req: Request, res: Response): Promise<void> {
    const { transactionId } = req.query;

    if (!transactionId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Transaction ID is required",
      });
      return;
    }
    try {
      const transactionResponse = await this.paymentService.getPaymentByIdDetails(
        transactionId as string
      );

      res.status(transactionResponse.status).json({
        message: transactionResponse.message,
        data: transactionResponse.data,
      });
    } catch (error) {
      console.error("Error getting transaction details:", error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error getting transaction details",
      });
    }
  }

  public async getPaymentEstablishment(
    req: Request,
    res: Response
  ): Promise<void> {
    const { establishmentId, consumptionCode } = req.query;

    if (!establishmentId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "establishmentId ID is required",
      });
      return;
    }
    try {
      const transactionResponse =
        await this.paymentService.getPaymentByEstablishment(
          establishmentId as string,
          consumptionCode as string
        );

      res.status(transactionResponse.status).json({
        message: transactionResponse.message,
        data: transactionResponse.data,
      });
    } catch (error) {
      console.error("Error getting transaction details:", error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Error getting transaction details",
      });
    }
  }
}
export default PaymentController;
