  let amazingEvents= [] //declaramos una variable que va a representar a todo el data de la api

//funcion asincrona
  async function getData(){   
    await fetch("https://amazing-events.herokuapp.com/api/events")                  
    .then((res) => res.json())
    .then(json => amazingEvents = json)

    const amazing = amazingEvents.events   
    let present = amazingEvents.currentDate  
    
//capturamos cada div donde pintaremos las cartas de cada evento
    let home = document.getElementById("home")
    let upcoming = document.getElementById("upcoming")
    let past = document.getElementById("past")

    var searchbar = document.getElementById("search") 

//arrays vacios

    let checkboxCheck = [];
    let searchText = "";
    let arrayData = [];

//aplicamos filtros y obtendremos dos arrays diferenciados de eventos pasados y eventos futuros a partir de la fecha de cada evento.
    let pastEvents = amazing.filter( pastE => pastE.date > present)
    let upcomingEvents = amazing.filter( upcomingE => upcomingE.date < present)
    
    
    function createChecks() {
      let checkboxes = document.getElementById('checkbox')
      let checkboxFilter = amazing.map(checks => { return checks.category });  
      const arrayChecks = new Set(checkboxFilter); 
    
      let checkboxs = [...arrayChecks] 
      console.log(arrayChecks)

      let checkFather = ""
      checkboxs.forEach(check =>{
        checkFather +=  `<label class="container-checkbox" for="${check}">
        <input class="form-check-input" type="checkbox" value="${check}" id="${check}">${check}
        <div class="checkmark"></div>
      </label>`
      })
      checkboxes.innerHTML = checkFather  // imprimimos los checkbox(template)
    }
    createChecks()

// Funcion para pintar las cartas

    function paintCards(array, cardsContainer) {
      cardsContainer.innerHTML= "";
      if(array.length > 0 ) {
        array.forEach(evento => {
          cardsContainer.innerHTML += `<div class="col-card  mt-5 gap-3 flex-wrap  "><div class="cardchild">
          <div class="card-img">
          <img src="${evento.image}"/>
        </div>
        <div class="card-info">
          <p class="text-title">${evento.name}</p>
          <p class="text-body">${evento.description}</p>
        </div>
        <div class="card-footer">
          <span class="text-title">$${evento.price}</span>
          <div class="card-button">
                <a href="./details.html?id=${evento._id}" >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="dark"
                    class="bi bi-info-circle-fill"
                    viewBox="0 0 16 19"
                  >
                    <path
                      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                    />
                  </svg>
                  </a>
                </div>
        </div>
      </div>
      </div>`
    
        }) 
      } else {
        cardsContainer.innerHTML= `
        <h3 class="card-title">The event has not been found...    
        </h3>`
      }
  }

  var checkbox = document.querySelectorAll("input[type=checkbox]")
  
    checkbox.forEach(check => check.addEventListener("click",(event) => {  
      var cheked =  event.target.checked
      if(cheked) {
        checkboxCheck.push(event.target.value)   // la condicion true anteriormente planteada se guarda en la variable a partir del push
      } else {
        checkboxCheck = checkboxCheck.filter(uncheck => uncheck !== event.target.value)   // condicion que se busca cuando el evento tarjet es opuesto a true 
      }

  arrayFiltered() 
}))

searchbar.addEventListener("keyup", (event) => { // al input search le agregamos un evento keyup (evento que se ejecuta con cada tecla en el input) es decir para cuando se presionan teclas
  searchText = event.target.value 
  arrayFiltered()
})


//Funcion de filtrado cruzado entre search y checkbox

function filtrado(array) {
  arrayData = []    
  if (checkboxCheck.length > 0 && searchText !== "") {
    checkboxCheck.map(home => {
      arrayData.push(...array.filter (show => show.name.toLowerCase().includes(searchText.trim().toLowerCase()) && show.category === home)) //combinacion de filtrado de checkbox y searchbar
    })
  } else if (checkboxCheck.length > 0 && searchText === "") {
    checkboxCheck.map(home => arrayData.push(...array.filter(show => show.category == home)))
  }else if (checkboxCheck.length === 0 && searchText !==  ""){
    arrayData.push(...array.filter(show => show.name.toLowerCase().includes(searchText.trim().toLowerCase()) || show.description.toLowerCase().includes(searchText.trim().toLowerCase())))
   

  } else {
    arrayData.push(...array)
  }

}

var arrayEventos = "";

    function arrayFiltered() {
        if (home != null) {
          filtrado(amazing)
            paintCards(arrayData, home)
        } else if (past != null) {
          filtrado(pastEvents)
            paintCards(arrayData, past)
        } else if (upcoming != null) {
          filtrado(upcomingEvents)
            paintCards(arrayData, upcoming)
        }
    }
    arrayFiltered()

    if (home != null) {
        paintCards(amazing, home)
    } else if (past != null) {
        paintCards(pastEvents, past)
    } else if (upcoming != null) {
        paintCards(upcomingEvents, upcoming)
    }

}
    getData()


    
  

  







