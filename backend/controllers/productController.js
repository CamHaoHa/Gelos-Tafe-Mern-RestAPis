const asyncHandler = require ('express-async-handler')

//@desc get all products
//@route GET /api/products
//@access Private
const getProducts = asyncHandler(async(req, res) => {
    res.status(200).json({message:'get products'})
})
//2
//@desc set 1 product, create 1 new product
//@route POST /api/products
//@access Private
const setProduct = asyncHandler(async(req, res) => {
    if(!req.body.text) {
       res.status(400)
       throw new Error('Please add a text field')
    }
    res.status(200).json({message:'set products'})
}
)
//@desc update one product
//@route PUT /api/products:id
//@access Private
const updateProduct = asyncHandler(async(req, res) => {
    res.status(200).json({message:`update product ${req.params.id}`})
}
)
//@desc delete one product
//@route DELETE /api/products:id
//@access Private
const deleteProduct =asyncHandler(async(req, res) => {
    res.status(200).json({message:`delete product ${req.params.id}`})
}
)
module.exports ={
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct
}