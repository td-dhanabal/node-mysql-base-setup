const express = require('express')
const router = express.Router();
const vendorController = require('../controllers/vendor');
const checkauth = require('../middleware/checkauth');

router.post("/add", vendorController.add_vendor);

router.get("/", checkauth, vendorController.all_vendors);

router.get('/:id', checkauth, vendorController.single_vendors);

module.exports = router;