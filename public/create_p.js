window.onload = () =>{

    async function showTeams(){
        let response = await fetch(`http://localhost:3000/team`);
        let result = await response.json();
    
        let select = document.getElementById('teamList');
        
        for(let i = 0; i < result.length; i++){
            let option = document.createElement('option');
            
            option.innerText = result[i].name;

            select.appendChild(option);

        }
        
    }

   
    showTeams();
}