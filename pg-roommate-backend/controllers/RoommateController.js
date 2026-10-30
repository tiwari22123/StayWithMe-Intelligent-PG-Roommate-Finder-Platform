const Roommate = require("../models/Roommate");

// ADD ROOMMATE PROFILE
const addRoommate = async (req, res) => {
  try {

    // Check if user already has a profile
    const existingProfile = await Roommate.findOne({
      user: req.user.id
    });

    if (existingProfile) {
      return res.status(400).json({
        message: "You already have a roommate profile. Please edit your existing profile."
      });
    }

    const {
      name,
      age,
      gender,
      city,
      occupation,
      budget,
      preferredLocation,
      lifestyle,
      description
    } = req.body;

    const roommate = await Roommate.create({
      user: req.user.id,
      name,
      age,
      gender,
      city,
      occupation,
      budget,
      preferredLocation,
      lifestyle,
      description
    });

    res.status(201).json({
      message: "Roommate profile created successfully",
      roommate
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET ALL ROOMMATES
const getAllRoommates = async (req, res) => {
  try {
    const roommates = await Roommate.find()
      .populate("user", "name email");

    res.status(200).json(roommates);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// SEARCH ROOMMATE BY CITY
const searchRoommateByCity = async (req, res) => {
  try {

    const city = req.query.city;

    const roommates = await Roommate.find({
      city: {
        $regex: city,
        $options: "i"
      }
    }).populate("user", "name email");

    res.status(200).json(roommates);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// FILTER ROOMMATES BY MAXIMUM BUDGET
const filterByBudget = async (req, res) => {
  try {

    const maxBudget = Number(req.query.maxBudget);

    const roommates = await Roommate.find({
      budget: {
        $lte: maxBudget
      }
    }).populate("user", "name email");

    res.status(200).json(roommates);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET MY ROOMMATE PROFILE
const getMyProfile = async (req, res) => {
  try {

    const roommate = await Roommate.findOne({
      user: req.user.id
    });

    if (!roommate) {
      return res.status(404).json({
        message: "Roommate profile not found"
      });
    }

    res.status(200).json(roommate);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// UPDATE MY ROOMMATE PROFILE
const updateMyProfile = async (req, res) => {
  try {

    const roommate = await Roommate.findOne({
      user: req.user.id
    });

    if (!roommate) {
      return res.status(404).json({
        message: "Roommate profile not found"
      });
    }

    const {
      name,
      age,
      gender,
      city,
      occupation,
      budget,
      preferredLocation,
      lifestyle,
      description
    } = req.body;

    roommate.name = name ?? roommate.name;
    roommate.age = age ?? roommate.age;
    roommate.gender = gender ?? roommate.gender;
    roommate.city = city ?? roommate.city;
    roommate.occupation = occupation ?? roommate.occupation;
    roommate.budget = budget ?? roommate.budget;
    roommate.preferredLocation =
      preferredLocation ?? roommate.preferredLocation;
    roommate.lifestyle =
      lifestyle ?? roommate.lifestyle;
    roommate.description =
      description ?? roommate.description;

    await roommate.save();

    res.status(200).json({
      message: "Roommate profile updated successfully",
      roommate
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// DELETE MY ROOMMATE PROFILE
const deleteMyProfile = async (req, res) => {
  try {

    const result = await Roommate.deleteMany({
      user: req.user.id
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Roommate profile not found"
      });
    }

    res.status(200).json({
      message: "Roommate profile deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};
// EXPORT
module.exports = {
  addRoommate,
  getAllRoommates,
  searchRoommateByCity,
  filterByBudget,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile
};