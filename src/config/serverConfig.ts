import express from "express";
import connectDB from "./mongoConfig";
import authRoutes from "../routes/authRoutes";
import paymentRoutes from "../routes/paymentRoutes";
import cors from "cors";

const app = express();
const PORT: number = Number(process.env.PORT) || 5000;

const configureServer = (): void => {
  app.use(express.json());
  connectDB();

  // Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/payments", paymentRoutes);

  // Health check
  app.get("/", (req, res): void => {
    res.send("¡Hello Word! 🚀");
  });
};

app.use(cors());

const startServer = (): void => {
  app.listen(PORT, (): void => {
    console.log(`Server running on http://localhost:${PORT} 🚀`);
  });
};

export { configureServer, startServer, app };
