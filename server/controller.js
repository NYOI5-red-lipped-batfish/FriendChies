const { query, json } = require('express');
const controller = {};
const db = require('./dbModel');

controller.getAllDogs = async (req, res, next) => {
  try {
    const getAllDogs = `SELECT * FROM pooches`;
    const listOfDogs = await db.query(getAllDogs);
    console.log(listOfDogs);
    res.locals.listOfDogs = listOfDogs.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

controller.getMatches = async (req, res, next) => {
  try {
    const id = 2;
    const getMatches =
      'SELECT p.id, p.name, p.owner, p.zip, p.breed, p.size, p.age, p.gender FROM pooches p RIGHT OUTER JOIN matches ON matches.matched_user = p.id WHERE matches.login_user = 1';
    const listOfMatches = await db.query(getMatches);
    console.log(listOfMatches);
    res.locals.matches = listOfMatches.rows;
    return next();
  } catch (err) {
    return next(err);
  }
};

controller.getPotentialMatches = async (req, res, next) => {
  try {
    const id = 2;
    // should be req.user.id contains the logged-in user's info
    // setting id for 2 is for testing purposes 
    const getPotentialMatches = 
    `SELECT * FROM pooches WHERE id NOT IN (SELECT dog_id FROM likes WHERE user_id = ${id}) AND id != ${id}`;
      // excluding the current user's pooch from potential matches
    
    const potentialMatches = await db.query(getPotentialMatches);
    console.log(potentialMatches);
    res.locals.potentialMatches = potentialMatches.rows;
    console.log(res.locals.potentialMatches);
    return next();
  } catch (err) {
    return next(err);
  }
};

controller.addToUserLikes = async (req, res, next) => {
  try {
    //not sure if this works...
    const updateLikes =
      'INSERT INTO likes (user_id, dog_id, liked) VALUES (${user_id}, {$dog_id}, ${state} )';
    const listOfLikes = await db.query(updateLikes);
    res.locals.listOfLikes = listOfLikes.rows;
    console.log(res.locals.updateLikes);
    return next();
  } catch (err) {
    return next(err);
  }
};

controller.checkForMatch = async (req, res, next) => {
  try {
    const checkMatches =
      'SELECT DISTINCT U.* FROM pooches AS U LEFT JOIN Likes AS L on L.dog_id = U.id WHERE L.liked = true AND L.dog_id = U.id';
    const Matches = await db.query(checkMatches);
    res.locals.matches = matches.row;
    console.log(res.locals.matches);
    return next();
  } catch (err) {
    return next(err);
  }
};

controller.updateMatch = async (req, res, next) => {};

module.exports = controller;
