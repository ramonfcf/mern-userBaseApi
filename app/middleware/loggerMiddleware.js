const loggerMiddleware = (req, res, next) => {
  console.log("------------------- Request Log --------------------");
  console.log(`[${new Date().toISOString()}] - |${req.method}| '${req.url}'`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  console.log("----------------------------------------------------");
  next();
};

module.exports = loggerMiddleware;
