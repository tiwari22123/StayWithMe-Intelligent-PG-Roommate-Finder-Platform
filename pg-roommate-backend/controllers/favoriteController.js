const Favorite = require("../models/Favorite");

// Add PG to favorites
const addFavorite = async (req, res) => {
  try {
    const { pgId } = req.body;

    if (!pgId) {
      return res.status(400).json({
        message: "PG ID is required"
      });
    }

    const existingFavorite = await Favorite.findOne({
      user: req.user.id,
      pg: pgId
    });

    if (existingFavorite) {
      return res.status(400).json({
        message: "PG already added to favorites"
      });
    }

    const favorite = await Favorite.create({
      user: req.user.id,
      pg: pgId
    });

    res.status(201).json({
      message: "PG added to favorites",
      favorite
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get user's favorite PGs
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user.id
    }).populate("pg");

    res.status(200).json(favorites);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Remove PG from favorites
const removeFavorite = async (req, res) => {
  try {
    const { pgId } = req.params;

    const favorite = await Favorite.findOneAndDelete({
      user: req.user.id,
      pg: pgId
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found"
      });
    }

    res.status(200).json({
      message: "PG removed from favorites"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite
};