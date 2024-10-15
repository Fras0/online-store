/**
 * @author : Fras 
 * @info   : file contains the controllers for the users .
 */
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";


const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    if (products) {
        res.json({
            products
        });
    } else {
        res.status(404);
        throw new Error("No data for products");
    }
});


const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json({
            data: product
        });
    } else {
        res.status(404);
        throw new Error("product not found");
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (product) {
        res.json({
            data: product
        });
    }
    else {
        res.status(404);
        throw new Error("product not found");
    }
});

const createProduct = asyncHandler(async (req, res) => {
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

const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        throw new Error('No document found with that id')
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
});


export { getAllProducts, getProduct, updateProduct, createProduct, deleteProduct };
