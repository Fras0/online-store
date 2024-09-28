/**
 * @author : Nader Hany
 * @description : The crud routes for the Campagins model.
 * @version: 1.0.0
 */
import express from 'express';
import {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from '../controllers/campagins.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getCampaigns)           // Get all campaigns
  .post(protect, createCampaign);        // Create a campaign (assuming admin)

router.route('/:id')
  .get(protect, getCampaignById)         // Get a single campaign
  .put(protect, updateCampaign)          // Update a campaign
  .delete(protect, deleteCampaign);      // Delete a campaign (assuming admin)

export default router;
