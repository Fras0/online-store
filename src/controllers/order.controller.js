/**
 * @author : Fras 
 * @info   : file contains the controllers for the users .
 */
import Order from "../models/order.js";
import HandlerFactory from "./handlerFactory.js";

class OrderController extends HandlerFactory {
    constructor() {
        super(Order);
    }
}
export default OrderController;