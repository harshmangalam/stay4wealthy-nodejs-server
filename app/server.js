const express = require("express");
const { NODE_ENV } = require("./config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const paymentRoutes = require("./routes/payment.route");

app.use(
  cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: "http://localhost:3000",
  })
);

if (NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cookieParser());

app.get("/", (_, res) => {
  res.status(200).json({
    type: "success",
    message: "server is up and running",
    data: null,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

// global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});

module.exports = app;
