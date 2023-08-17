const express = require("express");
const router = express.Router();

const {getTeams, getTeam, createTeam, updateTeam, deleteTeam, getPlayerNames} = require('../controllers/team');

//read
router.get('/', getTeams);
router.get('/:id', getTeam);
router.get('/:id/players', getPlayerNames);

//create
router.post('/create', createTeam);

//update
router.patch('/update/:id',  updateTeam);

//delete
router.delete('/delete/:id',  deleteTeam);

module.exports = router;