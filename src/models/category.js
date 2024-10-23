/**
 * @author     : Nader Hany
 * @interface  : this file contains the Categories schema .
 */
import mongoose from 'mongoose';

const categoriesSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
  },
  {
    timestamps: true,  // Automatically creates 'createdAt' and 'updatedAt'
  }
);

const Categories = mongoose.model('Categories', categoriesSchema);
export default Categories;
