// app.ts
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import allRoutes from "./app/routes/index";
import { generatedId } from "./utils/generateUserId";
import { openDb } from "./utils/db";
const app: Application = express();
app.use(cors());

// parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.get("/", async (req: Request, res: Response) => {
  const generateNewId = await generatedId();
  res.send({
    response: "Welcome to my Database",
    generateNewId,
  });
});
app.use((req: Request, res: Response, next: NextFunction) => {
  openDb()
    .then(db => {
      req.db = db; // Type must be extended!
      next();
    })
    .catch(err => {
      next(err); // Forward error to global handler
    });
});

// src/app.ts
app.use("/api/v1/", allRoutes);
app.use(globalErrorHandler);

// Handle Route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API not found",
      },
    ],
  });
  next();
});

export default app;
