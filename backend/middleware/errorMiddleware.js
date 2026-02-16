const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(400).json({ message: "Email already exists" });
  }

  res.status(400).json({
    message: err.message || "Server Error"
  });
};

module.exports = errorHandler;
