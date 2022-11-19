const express = require("express");
const router = express.Router();

router.use(require("./loginRoutes"));
router.use(require("./packageRoutes"));

module.exports = router;