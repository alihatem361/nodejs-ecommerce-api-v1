import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // check if the error is in development or production
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(err, res);
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
      error: err,
    });
  }
};

const errorHandler = (err, req, res, next) => {
  if (err.code && err.code === 11000) {
    const message = `Duplicate field value entered: ${Object.values(err.keyValue).join(', ')}`;
    err = new ApiError(message, 400);
  }

  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Something went very wrong!",
    error: {
      errorResponse: err,
    },
  });
};

export default errorHandler;
