/**
 * @author : Fras 
 * @info   : file contains the controllers for the users .
 */
import Review from "../models/review.js";
import HandlerFactory from "./handlerFactory.js";

class ReviewController extends HandlerFactory {
    constructor() {
        super(Review);
    }
}
export default ReviewController;