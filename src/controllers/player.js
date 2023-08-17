const teamModel = require("../models/team");
const playerModel = require('../models/player');

//READ
const getPlayers = async(req, res) => {
    try {
        const Players = await playerModel.find({});
        res.status(200).json(Players);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getPlayer = async(req, res) => {
    try {
        const {id} = req.params;
        const player = await playerModel.findById(id);
        //if player doesn't exist then 404
        if(!playerModel){
            return res.status(404).json({message: "player not found"});
        }

        res.status(200).json(player);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//create
const createPlayer = async(req, res) => {
    try {

        //create player  with given variables
        const {firstName, lastName, team} = req.body;
        const newPlayer = new playerModel({
            firstName: firstName,
            lastName: lastName,
            team: team,
        })
        //look for the given team and check if it exists
        const connectTeam = await teamModel.findById(team);
        //if not then 404
        if(!connectTeam){
            return res.status(404).json({message: "Team not found"});
        }
        //save player && team updated playerlist 
        await newPlayer.save();
        connectTeam.players.push(newPlayer._id);
        await connectTeam.save();
        

        res.status(201).json(newPlayer);

    } catch (error) {
       res.status(409).json({message: error.message});
    }
}

//update

const updatePlayer = async(req, res)=>{
    try{
        const { id } = req.params;
        const {firstName, lastName, team} = req.body;

        const player = await playerModel.findById(id);
        
        const currentTeam = await teamModel.findById(player.team);

        if(!player){
            return res.status(404).json({message: "Player not found"});
        }
        //check if variables have values and then add them
        if(firstName) playerModel.firstName = firstName;

        if(lastName) playerModel.lastName = lastName;
        //if we update the team of a player we also need to check the current team. We need to remove playerid from current team and add it to new team
        if(team && currentTeam){
            const newTeam = await teamModel.findById(team);

            if(!newTeam){
                return res.status(404).json({message: "New Team not found"});
            }

            const index = currentTeam.players.indexOf(id);
            currentTeam.players.splice(index, 1);

            teamModel.players = currentTeam.players;
            playerModel.team = team;
            newTeam.players.push(id);

            await newTeam.save();
            await currentTeam.save();
        } 

        await player.save();

        res.status(200).json(player);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}
//delete

const deletePlayer = async(req,res) => {
    try {
        const {id} = req.params;
        const deleteUser = await playerModel.findById(id);
        
        
        if(!deleteUser){
            return res.status(404).json({message: "User not found"});
        }
        let oldTeamId = deleteUser.team;
        //if we delete player we need to delete their id from old team
        if(oldTeamId){
            let oldTeam = await teamModel.findById(oldTeamId);

            const index = oldTeam.players.indexOf(id);
            oldTeam.players.splice(index, 1);

            await oldTeam.save();
        }
        


        await teamModel.findByIdAndRemove(id);
        
        res.status(200).json({message: "player sucessfully deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports = {getPlayers, getPlayer, createPlayer, updatePlayer, deletePlayer};