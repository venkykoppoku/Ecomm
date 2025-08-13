export default (err, req, res, next) => {
  const error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "internal server error",
  };

  if (process.env.NODE_ENV === "DEV") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }

  if (process.env.NODE_ENV === "PROD") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
};
