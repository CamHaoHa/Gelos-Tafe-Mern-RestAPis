const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
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
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Product', productSchema)