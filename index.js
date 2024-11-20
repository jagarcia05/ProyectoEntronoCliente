


  function getGame(page = 1, pageSize = 40) {
    const url = `https://api.rawg.io/api/games?key=236c519bed714a588c3f1aee662a2c2d&page=${page}&page_size=${pageSize}`
    fetch(url)
    
      .then(response => response.json())
      .then(data => {
       
         
          procesardatos(data.results);
        }
        );
      }

function procesardatos(data){
 
 
  
data.forEach(game => {
  console.log(game.slug)
  });
 
}
getGame(1,40)