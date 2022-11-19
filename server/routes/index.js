/**
 * Main routes
 * @author Praveen Varma
 */
const express = require("express");
const router = express.Router();

router.use(require("./loginRoutes"));
router.use(require("./packageRoutes"));
router.use(require("./addOnRoutes"));

module.exports = router;