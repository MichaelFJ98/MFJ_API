window.onload = () =>{

    //function that shows all teams.
    async function showTeams(){
        let response = await fetch(`http://localhost:3000/team`);
        let result = await response.json();
    
        console.log(result);
        let ul = document.getElementById('playerList');

        for(let i = 0; i < result.length; i++){
            let h5 = document.createElement("h5");
            let p = document.createElement("p");
            h5.innerText = result[i].name;
            p.innerText = result[i].description;
            ul.appendChild(h5);
            ul.appendChild(p);


            const players = await fetch(`http://localhost:3000/team/${result[i]._id}/players`);
            const player_res = await players.json();

            for(let j = 0; j < player_res.players.length; j++){
                let li = document.createElement('li');
                li.innerText = player_res.players[j].firstName + ' ' + player_res.players[j].lastName,
                ul.appendChild(li);
            }

            
        }
        
        
        
        

        
    }

    showTeams();
}
