const Pg = require("../models/Pg");

// Add PG
const addPg = async (req, res) => {
  try {
    const pg = await Pg.create(req.body);
    res.status(201).json(pg);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All PGs
const getAllPgs = async (req, res) => {
  try {
    const pgs = await Pg.find();
    res.status(200).json(pgs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Search PG by City
const searchPgByCity = async (req, res) => {
  try {

    const city = req.query.city;

    const pgs = await Pg.find({
      city: city
    });

    res.status(200).json(pgs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// Filter PG by Rent
const filterByRent = async (req, res) => {

  try {

    const maxRent = Number(req.query.maxRent);

    const pgs = await Pg.find({
      rent: {
        $lte: maxRent
      }
    });

    res.status(200).json(pgs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  addPg,
  getAllPgs,
  searchPgByCity,
  filterByRent
};