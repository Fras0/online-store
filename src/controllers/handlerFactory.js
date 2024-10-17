import { AppError } from "../utils/appError.js"
import asyncHandler from 'express-async-handler';

class HandlerFactory {
    constructor(Model) {
        this.Model = Model;
    }

    getAll = asyncHandler(async (req, res, next) => {
        const doc = await this.Model.find();

        if (doc) {
            res.status(200).json({
                status: 'success',
                results: doc.length,
                data: {
                    data: doc
                }
            })
        } else {
            return next(new AppError("No documents found", 404))
        }
    })


    getOne = asyncHandler(async (req, res, next) => {
        const doc = await this.Model.findById(req.params.id);

        if (doc) {
            res.status(200).json({
                status: "success",
                data: {
                    data: doc,
                }
            })
        } else {
            return next(new AppError("No document found with that id", 404));
        }
    })

    createOne = asyncHandler(async (req, res, next) => {
        const doc = await this.Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        })
    })


    updateOne = asyncHandler(async (req, res, next) => {
        const doc = await this.Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(new AppError('No document found with that id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });


    deleteOne = asyncHandler(async (req, res, next) => {
        const doc = await this.Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that id', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    })

}

export default HandlerFactory