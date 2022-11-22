const asyncHandler = require ('express-async-handler')

const Order = require ('../models/orderModel')
const Employee = require ('../models/employeeModel')
//@desc get all orders
//@route GET /api/orders
//@access Private
const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
})
//2
//@desc set 1 product, create 1 new product
//@route POST /api/orders
//@access Private
const setOrder = asyncHandler(async(req, res) => {
    if(!req.body) {
       res.status(400)
       throw new Error('Please add a text field')
    }

    const {OrderNo} = req.body;
   
    const orderExists = await Order.findOne({OrderNo})
    if(orderExists) {
        res.status(400)
        throw new Error ('orderno already exists')
    }
    console.log(req.user.id)
    const order = await Order.create({
        CustNo: req.body.CustNo,
        ProductCode:req.body.ProductCode,
        ProductName : req.body.ProductName,
        ProductQuantity : req.body.ProductQuantity,
        Product_price : req.body.Product_price,
        OrderNo: req.body.OrderNo,
        OrderCode:req.body.OrderCode,
        OrderName : req.body.OrderName,
        OrderQuantity : req.body.OrderQuantity,
        Order_price : req.body.Order_price,
        Total: req.body.Total,
        employee:req.user.id 
    })
    res.status(200).json(order)
}
)
//@desc update one product
//@route PUT /api/orders:id
//@access Private
const updateOrder = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(!order) {
        res.status(400)
        throw new Error(`product ${req.params.id} not found`)
    }

    //for authorization
    const admin = await Employee.findById(req.user.id)
    console.log(admin.roles)
    //check for user
    if(admin.roles !== 1) {
        res.status(401)
        throw new Error('You are not admin, GET out')
    }

    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    
    res.status(200).json(updatedOrder)
}
)
//@desc delete one product
//@route DELETE /api/orders:id
//@access Private
const deleteOrder =asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)
    if(!order) {
        res.status(400)
        throw new Error(`product ${req.params.id} not found`)
    }

    //for authorization
    const admin = await Employee.findById(req.user.id)
    console.log(admin.roles)
    //check for user
    if(admin.roles !== 1) {
        res.status(401)
        throw new Error('You are not admin, GET out')
    }

    await order.remove()
    res.status(200).json({id: req.params.id})
}
)
module.exports ={
    getOrders,
    setOrder,
    updateOrder,
    deleteOrder
}