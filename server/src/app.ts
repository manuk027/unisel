import express from "express";
import productRoutes from "./routes/product.routes.js";
import { Request, Response, NextFunction } from "express";
import authRouter from "./routes/auth.routes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Something went wrong",
  });
});