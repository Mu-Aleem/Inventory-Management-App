import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

//routes import
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
// import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(bodyParser.json());
// app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);

export { app };
