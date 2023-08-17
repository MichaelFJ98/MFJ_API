const teamModel = require('../models/team');
const playerModel = require('../models/player');

//READ
const getTeams = async(req, res) => {
    try {
        const teams = await teamModel.find({});
        res.status(200).json(teams);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getTeam = async(req, res) => {
    try {
        const {id} = req.params;
        const team = await teamModel.findById(id);
        //check if team exists, if not 404
        if(!teamModel){
            return res.status(404).json({message: "Team not found"});
        }

        res.status(200).json(team);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//create
const createTeam = async(req, res) => {
    try {
        //make new team with given variables
        const {name, description, players} = req.body;
        const newTeam = new teamModel({
            name: name,
            description: description,
            players: players,
        })

        await newTeam.save();

        res.status(201).json(newTeam);

    } catch (error) {
       res.status(409).json({message: error.message});
    }  
}

//update
const updateTeam = async(req, res)=>{
    try{
        const { id } = req.params;
        const {name, description} = req.body;

        const team = await teamModel.findById(id);

        if(!team){
            return res.status(404).json({message: "Team not found"});
        }

        if(name) teamModel.name = name;

        if(description) teamModel.description = description;

        const updateTeam = await team.save();

        res.status(200).json(updateTeam);
    } catch(err){
        res.status(500).json({message: err.message});
    }
}


//delete
const deleteTeam = async(req,res) => {
    try {
        const {id} = req.params;
        const deleteTeam = await teamModel.findById(id);
        
        
        if(!deleteTeam){
            return res.status(404).json({message: "Team not found"});
        }
        //if team gets removes, we should remove the players their team aswell
        let removePlayers = deleteTeam.players;
        //for each player remove their team and set it to null
        for(let i = 0 ; i<removePlayers.length; i++){
            const player = await playerModel.findById(removePlayers[i]);
            player.team = null;
            player.save();
        }

        await teamModel.findByIdAndRemove(id);
        
        res.status(200).json({message: "Team sucessfully deleted"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
//Extra
//get all players from a team
const getPlayerNames = async(req, res) =>{
    try {
    
        playerNamesList = [];

        const teamId = req.params.id;
        const team = await teamModel.findById(teamId);
        
        if(!team){
            return res.status(404).json({message: "Team not found"});
        }

        const players = await playerModel.find({_id: {$in: team.players}});

        res.status(200).json({players});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {getTeams, getTeam, createTeam, updateTeam, deleteTeam, getPlayerNames};