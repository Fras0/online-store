/**
 * @author     : Nader Hany
 * @interface  : this file contains the campagins schema .
 */
import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema(
  {
    userId:{
        type: String,
        required: true,
    },
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
      unique: true,  // Remove unique if not needed
    },
    img: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,  // Automatically creates 'createdAt' and 'updatedAt'
  }
);

const Campaign = mongoose.model('Campaign', campaignSchema);

export default Campaign;
