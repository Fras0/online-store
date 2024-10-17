/**
 * @author : Fras 
 * @info   : file contains the controllers for the users .
 */
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import HandlerFactory from "./handlerFactory.js";

class ProductController extends HandlerFactory {
    constructor() {
        super(Product);
    }
    createProduct = asyncHandler(async (req, res) => {
        const productData = {
            ...req.body,
            added_by: req.user._id, // Add the user ID to the product data
        };
        const product = await Product.create(productData);
        res.status(201).json({
            status: 'success',
            data: {
                data: product,
            },
        });
    });


}
export default ProductController;