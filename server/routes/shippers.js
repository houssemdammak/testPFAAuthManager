const express = require ('express')
const router = express.Router()
const Shipper=require ('../models/ShipperModel')
const {
    login,
    getShippers,
    getShipper,
    createShipper,
    deleteShipper,
    updateShipper,
    getCollectionByShipper
} =require ('../controllers/ShipperController')

//login shipper 
router.post("/login",login)

//get all Shippers
// router.get('/',authMiddleware,getShippers)
router.get('/',getShippers)

//get single Shipper
router.get('/:id',getShipper)

//Post new Shipper
router.post('/',createShipper)

//delete a Shipper
router.delete('/:id',deleteShipper)
    
//Update a Shipper
router.patch('/:id',updateShipper)
//get collection by shipper 
router.get('/getCollection/:id',getCollectionByShipper)



module.exports = router