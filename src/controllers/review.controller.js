/**
 * @author : Fras
 * @info   : file contains the controllers for the users .
 */
import Review from "../models/review.js";
import HandlerFactory from "./handlerFactory.js";
import asyncHandler from "express-async-handler";

class ReviewController extends HandlerFactory {
  constructor() {
    super(Review);
  }

  getAll = asyncHandler(async (req, res, next) => {
    var doc;
    const productId = req.params.productId
    if (productId) {
      doc = await Review.find({ product: productId });
    } else {
      doc = await Review.find();
    }

    if (doc) {
      res.status(200).json({
        status: "success",
        results: doc.length,
        data: {
          data: doc,
        },
      });
    } else {
      return next(new AppError("No documents found", 404));
    }
  });

  setProductUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
  };
}
export default ReviewController;
