export const errorHandlerMiddleware = async (err, req, res, next) => {
  console.error(err); // Logs the error for debugging purposes

  // Sending back the error message and a generic response
  return res.status(500).json({
    message: err.message || 'Something went wrong, please try again later.',
  });
};
