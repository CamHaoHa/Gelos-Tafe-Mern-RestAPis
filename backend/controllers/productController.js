const asyncHandler = require ('express-async-handler')

const Product = require ('../models/productModel')
const Employee = require ('../models/employeeModel')
//@desc get all products
//@route GET /api/products
//@access Private
const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})
//2
//@desc set 1 product, create 1 new product
//@route POST /api/products
//@access Private
const setProduct = asyncHandler(async(req, res) => {
    if(!req.body) {
       res.status(400)
       throw new Error('Please add a text field')
    }

    const product = await Product.create({
        ProductCode:req.body.ProductCode,
        ProductName : req.body.ProductName,
        ProductQuantity : req.body.ProductQuantity,
        Product_price : req.body.Product_price,
        employee:req.user.id //new code line for author
    })
    res.status(200).json(product)
}
)
//@desc update one product
//@route PUT /api/products:id
//@access Private
const updateProduct = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
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

    // if(product.employee.toString() !== admin.id ) {
    //     res.status(401)
    //     throw new Error('User not authorised, you are not the admin, GET OUT')
    // }
    //
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    
    res.status(200).json(updatedProduct)
}
)
//@desc delete one product
//@route DELETE /api/products:id
//@access Private
const deleteProduct =asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        res.status(400)
        throw new Error(`product ${req.params.id} not found`)
    }
    //for authorization
    const admin = await Employee.findById(req.user.id)
    console.log(admin.roles)
    //check for admin roles
    
    if(admin.roles !== 1) {
        res.status(401)
        throw new Error('You are not admin, GET out')
    }
    
    await product.remove()
    res.status(200).json({id: req.params.id})
    
}
)
module.exports ={
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct
}