const express = require('express');
const router = express.Router();

// Define routes
router.use('/notes', require('./notes'));

// Export the router
module.exports = router;
