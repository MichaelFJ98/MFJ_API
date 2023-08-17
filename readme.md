CRUD

Player -> Create, read, update, delete.

On create players need to join a team. We can read all players in the db and search for a specific player. 
when updating a player you can update the team, this will delete the player from the old teams playerlist. When deleting a player, the player will also get removed from their old teams playerlist.

Team -> Create, read, update, delete

When creating a team you get an empty player list. You can make calls to find teams seperatly or all teams. updating teams you can change name and description. If you delete a team the players their team will be removed from the db.

In addition we added basic valditation in the models, specifieng what type each value should be and if it has a limit. 
