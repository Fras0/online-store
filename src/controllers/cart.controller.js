/**
 * @author : Fras 
 * @info   : file contains the controllers for the users .
 */
import Cart from "../models/cart.js";
import HandlerFactory from "./handlerFactory.js";

class CartController extends HandlerFactory {
    constructor() {
        super(Cart);
    }
}
export default CartController;