const express = require('express')
const sellerController = require('../Controllers/sellerController')
const buyerController = require('../Controllers/buyerController')
const propertyController = require('../Controllers/propertyController')

const router = new express.Router()

router.post('/register/seller',sellerController.register)
router.post('/register/buyer',buyerController.register)
router.post('/seller',propertyController.upload)
router.get('/seller',propertyController.getAllProperties)

router.post('/login',sellerController.login)


module.exports = router