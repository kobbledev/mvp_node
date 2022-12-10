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
router.use(require("./enquiryRoutes"));
router.use(require("./dashboardRoutes"));
router.use(require("./userRoutes"));

module.exports = router;