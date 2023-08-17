const express = require("express");
const router = express.Router();

const {getPlayers, getPlayer, createPlayer, updatePlayer, deletePlayer} = require('../controllers/player');

//read
router.get('/', getPlayers);
router.get('/:id', getPlayer);

//create
router.post('/create', createPlayer);

//update
router.patch('/update/:id',  updatePlayer);

//delete
router.delete('/delete/:id',  deletePlayer);

module.exports = router;