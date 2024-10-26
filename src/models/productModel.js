import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A product must have a name'],
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: [true]
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        added_by: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);


const Product = mongoose.model('Product', productSchema)

export default Product;