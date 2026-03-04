const express = require("express");
const router = express.Router();
const { rateBook } = require("../../controllers/bookController");

router.post("/:id/rate", rateBook);

module.exports = router;
