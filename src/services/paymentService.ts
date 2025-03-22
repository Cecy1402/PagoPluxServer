import axios from "axios";
import { StatusCodes } from "http-status-codes";

class PaymentService {
  private axiosClient = axios.create({
    auth: {
      username: process.env.PAYPLUX_CLIENT_ID || "",
      password: process.env.PAYPLUX_SECRET_KEY || "",
    },
    baseURL: process.env.PAYPLUX_API_BASE_URL,
  });

  public async getPaymentByIdDetails(transactionId: string) {
    try {
      const response = await this.axiosClient.get(
        `/getTransactionByIdStateResource?idTransaction=${transactionId}`
      );

      if (response.data.success) {
        return {
          status: StatusCodes.OK,
          data: response.data,
          message: "Query completed successfully",
        };
      }

      return {
        status: StatusCodes.NOT_FOUND,
        message: "Transaction not found",
      };
    } catch (error) {
      console.error("Error getting transaction details:", error);
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error getting transaction details",
      };
    }
  }

  public async getPaymentByEstablishment(
    establishmentId: string,
    consumptionCode: string
  ) {
    try {
      const response = await this.axiosClient.get(
        `/getTransactionByIdStateResource?consumptionCode=${consumptionCode}&idEstablishment=${establishmentId}`
      );

      if (response.data.success) {
        return {
          status: StatusCodes.OK,
          data: response.data,
          message: "Query completed successfully",
        };
      }
      return {
        status: StatusCodes.NOT_FOUND,
        message: "Establishment not found",
      };
    } catch (error) {
      console.error("Error getting transaction details:", error);
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: "Error getting transaction details",
      };
    }
  }
}

export default PaymentService;
