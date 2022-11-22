const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    "OrderNo" : {
        required: true,
        type: Number,
        unique: true
    },

    "OrderDate" :{
        required: true,
        type: Date, 
        default: new Date()
    }, 

    "CustNo" :{
        required: true,
        type: Number
    }, 
    // product: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref : 'Product'
    // },
    "Total" :{
        required: true,
        type: Number
    },

    "ModeOfPayment" :{
        type: String
    },

    "ProductCode": {
        type: Number,
        required: [true, 'please add a product code']
    },

    "ProductName": {
        type: String,
        required: true
    },

    "ProductQuantity": {
        type: Number,
        required: true
    },

    "Product_price": {
        type: Number,
        required: true
},
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee',
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('Order', orderSchema)