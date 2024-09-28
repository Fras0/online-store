/**
 * @author : Nader Hany
 * @description : The crud Controlleres for the Campagins model.
 * @version: 1.0.0
 */
import asyncHandler from 'express-async-handler';
import Campaign from '../models/campagins.js';

/**
 * @desc    Get all campaigns
 * @route   GET /api/campaigns
 * @access  Private
 */
const getCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({userId:req.user});
  res.json(campaigns);
});

/**
 * @desc    Get a single campaign by ID
 * @route   GET /api/campaigns/:id
 * @access  Private
 */
const getCampaignById = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (campaign && campaign.userId===req.user) {
    res.json(campaign);
  }else if(campaign.userId!==req.user){
    res.status(401);
  }else {
    res.status(404);
    throw new Error('Campaign not found');
  }
});

/**
 * @desc    Create a new campaign
 * @route   POST /api/campaigns
 * @access  Private/Admin
 */
const createCampaign = asyncHandler(async (req, res) => {
  const { title, details, img } = req.body;
    const userId=req.user;
  const campaign = new Campaign({
    title,
    details,
    img,
    userId

  });
  const createdCampaign = await campaign.save();
  res.status(201).json(createdCampaign);
});

/**
 * @desc    Update a campaign
 * @route   PUT /api/campaigns/:id
 * @access  Private/Admin
 */
const updateCampaign = asyncHandler(async (req, res) => {
  const { title, details, img } = req.body;
  
  const campaign = await Campaign.findById(req.params.id);

  if (campaign && campaign.userId===req.user) {
    campaign.title = title || campaign.title;
    campaign.details = details || campaign.details;
    campaign.img = img || campaign.img;

    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  }else if(campaign.userId!==req.user){
    res.status(401);
  } else {
    res.status(404);
    throw new Error('Campaign not found');
  }
});

/**
 * @desc    Delete a campaign
 * @route   DELETE /api/campaigns/:id
 * @access  Private/Admin
 */
const deleteCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (campaign && campaign.userId===req.user) {
    await campaign.remove();
    res.json({ message: 'Campaign removed' });
  }else if(campaign.userId!==req.user){
    res.status(401);
  } else {
    res.status(404);
    throw new Error('Campaign not found');
  }
});

export {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
};
