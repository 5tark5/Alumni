const express = require("express");

const router = express.Router();

router
  .route("/")
  .post()
  .get();

export default router;