const mongoose = require('mongoose');

const orderSchema = mongoose.model({
    "OrderNo." : {
        required: true,
        type: Number,
        unique: true
    },

    "OrderDate" :{
        required: true,
        type: Date, 
        default: new Date()
    }, 

    "CustNo." :{
        required: true,
        type: Number
    }, 
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Product'
    },
    "Total" :{
        required: true,
        type: Number
    },

    "ModeOfPayment" :{
        type: String
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Order', orderSchema)