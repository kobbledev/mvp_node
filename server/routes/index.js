/**
 * Main routes
 * @author Praveen Varma
 */
const express = require("express");
const router = express.Router();

router.use(require("./loginRoutes"));
router.use(require("./packageRoutes"));
router.use(require("./addOnRoutes"));
router.use(require("./companyRoutes"));
router.use(require("./venueRoutes"));
router.use(require("./masterRoutes"));

module.exports = router;