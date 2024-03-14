const cors = require("cors");

const corsOptions = {
  origin: process.env.CORS_ORIGIN.split(","),
  optionsSuccessStatus: 200,
  methods: "GET, POST, PATCH, DELETE",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "X-Requested-With",
    "Username",
  ],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
