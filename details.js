let amazingEvents= [] //declaramos una variable que va a representar a todo el data de la api


  async function getData(){   //funcion asincrona
    await fetch("https://amazing-events.herokuapp.com/api/events")    //url de la api
    .then((res) => res.json())
    .then(json => amazingEvents = json)

  const amazing = amazingEvents.events 

  async function details () {           //funcion details 
    var id = location.search.split("?id=");       // al utilizar la funcion split que su funcion es dividir un string en un array separamos el "?id="(que es lo que necesitamos para captuar el id de cada evento) del id otorgado por la api.
    var idSelected = id[1];
    var evento = amazing.find(function(evento){
      return evento._id == idSelected;

    });
    console.log()       
    var main = `
      <div class="card">
        <div class="card-img"> 
              <img src=${evento.image} />
        </div>
        <div class="card-info">
              <p class="text-title">${evento.name}</p>
              <p class="text-body"><b>${evento.category}</b></p>
              <p class="text-body">${evento.description}</p>
              <p class="text-body"><u>Date</u>:  ${evento.date}</p>
              <p class="text-body"><u>Place</u>:  ${evento.place}</p>
              <p class="text-body"><u>Capacity</u>:  ${evento.capacity}</p>
              <p class="text-body"><u>Assistance</u>:  ${evento.assistance}</p>
        </div>
        <div class="card-footer">
              <span class="text-title">$${evento.price}</span>
        </div>
    </div>`
    
      document.getElementById("formdetail").innerHTML = main;
      }
      details();
  }
  getData()

