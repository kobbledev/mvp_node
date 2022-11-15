const express = require("express");
const router = express.Router();

router.use(require("./loginRoutes"));

module.exports = router;