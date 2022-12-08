const errorResponse = (
  res,
  status = 400,
  errorMessage = "Something Went Wrong!"
) => {
  res.status(status);
  throw new Error(errorMessage);
};

module.exports = { errorResponse };
