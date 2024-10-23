/**
 * @author : Fras 
 * @info   : file contains the controllers for the users .
 */
import Categories from "../models/category.js";
import HandlerFactory from "./handlerFactory.js";

class CartegoriesController extends HandlerFactory {
    constructor() {
        super(Categories);
    }
}
export default CartegoriesController;