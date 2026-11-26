
const User = require('../models/User');

// GET: Retrieve the logged-in user's profile.
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: 'User profile not found'
      });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully',
      profile: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve profile',
      error: error.message
    });
  }
};

// PUT: Update the logged-in user's profile.
const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      'name',
      'email',
      'neighborhood',
      'estate',
      'skills',
      'services',
      'contactInfo'
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: 'No valid profile fields provided'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User profile not found'
      });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      profile: user
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update profile',
      error: error.message
    });
  }
};

module.exports = {
  getProfile,
  updateProfile
};
