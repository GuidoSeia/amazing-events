let amazingEvents= [] //declaramos una variable que va a representar a todo el data de la api


  async function getData(){   //funcion asincrona
    await fetch("https://amazing-events.herokuapp.com/api/events")        //url de la api
      .then((res) => res.json())
      .then(json => amazingEvents = json)

    const amazing = amazingEvents.events   //declaramos la constante amazing que va a representar el objeto events de la data (amazingEvents)

    let present = amazingEvents.currentDate;    // Fecha actual

    //...........TABLE ONE..............

    //array base de past events a partir de un filtro
    
    //HAGO UN FILTRO CREANDO LA VARIABLE DE EVENTOS PASADOS
    //MAPEO EL ARRAY TOMANDO LAS PROPIEDADES ASSISTANCE Y CAPACITY DE CADA OBJETO, CALCULANDO EN LA VARIABLE PERCENTAGE EL PORCENTAJE DE AMBAS VARIABLES, LAS FIXEO EN NUMEROS ENTEROS, Y EN EL ULTIMO PASO AGREGO AL ARRAY PASTEVENTS LA PROPIEDAD PERCENTAGE.
    //AL FINAL HAGO UN SORT(ordena los elementos de un arreglo (array) localmente y devuelve el arreglo ordenado.) A PASTEVENTS TOMANDO COMO PARAMETRO LOS PERCENTAGE DE CADA ELEMENTO, PARA QUE ME LOS ORDENE DE MAYOR A MENOR.
    //LUEGO HAGO UN FILTRO PARA EXTRAER LAS CAPACIDADES Y ORDENARLAS PARA SABER CUAL ES LA MAYOR

    let pastEvents = amazing.filter(evento => evento.date < present);
    
    console.log(pastEvents)
    pastEvents.map(evento => {                  
      var capacity = evento.capacity;
      var assistance = evento.assistance;
      var percentage = ((assistance / capacity) * 100).toFixed();
      evento.percentage= percentage
      
    });
      
    const pastEventscalc = pastEvents.sort((a,b) => b.percentage - a.percentage);
    var capacity = amazing.filter(evento => evento.capacity).sort((a,b) => b.capacity - a.capacity);
    console.log(pastEventscalc)
  
  
  // function table ONE
  function firstTable(pastEventscalc, capacity) {
    let tableOne = `<tr class= "subtitleTable">
                      <td class="titleTable">Event with the highest percentage of attendance</td>
                      <td class="titleTable">Event with the lowest percentage of attendance</td>
                      <td class="titleTable">Event with larger capacity</td>
                  </tr>
                  <tr class= "data-table">
                             <td>${pastEventscalc[0].name}:  ${pastEventscalc[0].percentage}%</td>
                             <td>${pastEventscalc[pastEventscalc.length - 1].name}:  ${pastEventscalc[pastEventscalc.length - 1].percentage}% </td>
                             <td>${capacity[0].name}:  ${capacity[0].capacity}</td>
                  </tr>`;

  document.getElementById("tableOne").innerHTML = tableOne;

  }

  firstTable(pastEventscalc, capacity);
  

// ......... TABLETWO..............

// array base de upcoming events
let upcomingEvents = amazing.filter(evento => evento.date >  present);       
console.log(upcomingEvents);


// array de categorias del upcoming. 

const upcomingCat = upcomingEvents.map(evento => evento.category)

//mediante set elimino las categorias duplicadas, set transforma el array de categorias en un una coleccion de valores unicos
const upcomingCategoryNew = new Set (upcomingCat) 

const categoryUpcoming = [...upcomingCategoryNew]  // A traves de los spread operator cambiamos la coleccion de valores unicos set a un array.
console.log(categoryUpcoming)

// creamos array donde contendra tanto las categorias como los eventos

const categoryUpcomingArray = [];
categoryUpcoming.map(category => categoryUpcomingArray.push({
    category: category,
    evento: upcomingEvents.filter(evento => evento.category === category)

}));

console.log(categoryUpcomingArray)

//creamos array de objetos donde cada uno contendra las propiedades de category, estimate, capacity y revenuescalc.

let categoryUpcomingData = []
categoryUpcomingArray.map(data =>{
  categoryUpcomingData.push({
    category: data.category,
    estimate: data.evento.map(item => item.estimate),
    capacity: data.evento.map(item =>item.capacity),
    revenuesCalc: data.evento.map(item =>item.estimate * item.price)
  });
});
console.log(categoryUpcomingData)


// Realizamos la suma de cada categoria con respecto a cada objeto ( capacity, revenuesupcoming y revenuescalc) y calculamos el porcentaje de asistencia . Tenemos en cuentas que ciertos datos numericos se encuentran en formato string por lo cual al aplicar "number" hacemos la conversion.-

categoryUpcomingData.forEach(category => {
  let estimateSuma = 0;
  category.estimate.forEach(estimate => estimateSuma += Number(estimate));
  category.estimate = estimateSuma;

  let capacitySuma = 0;
  category.capacity.forEach(capacity => capacitySuma += Number(capacity));
  category.capacity = capacitySuma;

  let totalRevenuesCalc = 0;
  category.revenuesCalc.forEach(revenuesCalc => totalRevenuesCalc += Number(revenuesCalc))
  category.revenuesCalc = totalRevenuesCalc

  category.porcentageAttendace = ((estimateSuma * 100) / capacitySuma).toFixed(); // el toFixed nos otorgara valores numericos redondeados.
})

// function table TWO

function secondTable() {
  let tableTwo = `<tr class= "subtitleTable">
                      <td class="titleTable">Categories</td>
                      <td class="titleTable">Revenues</td>
                      <td class="titleTable">Percentage of  attendance</td>
                    </tr>`
                    categoryUpcomingData.forEach(evento => {
                    evento.categoryUpcomingData
                    tableTwo += `<tr class= "data-table">
                      <td>${evento.category}</td>
                      <td>$ ${evento.revenuesCalc}</td>
                      <td>${evento.porcentageAttendace}%</td>
                    </tr>`
  
})
document.getElementById("tableTwo").innerHTML = tableTwo;
}
secondTable();

// TABLE 3 

// array de categorias del upcoming. 
const pastCat = pastEvents.map(evento => evento.category)

//mediante set elimino las categorias duplicadas, set transforma el array de categorias en un una coleccion de valores unicos
const pastCategoryNew = new Set (pastCat) 

const categoryPast = [...pastCategoryNew]  // A traves de los spread operator cambiamos la coleccion de valores unicos set a un array.
console.log(categoryPast)

// creamos array donde contendra tanto las categorias como los eventos

const categoryPastArray = [];
categoryPast.map(category => categoryPastArray.push({
      category: category,
      evento: pastEvents.filter(evento => evento.category === category)

}));
console.log(categoryPastArray)

//creamos array de objetos donde cada uno contendra las propiedades de category, assistence, capacity y revenuescalc.

let categoryPastData = []
categoryPastArray.map(data =>{
  categoryPastData.push({
    category: data.category,
    assistance: data.evento.map(item => item.assistance),
    capacity: data.evento.map(item =>item.capacity),
    revenuesCalc: data.evento.map(item =>item.assistance * item.price)
  });
});
console.log(categoryPastData)


// Realizamos la suma de cada categoria con respecto a cada objeto ( capacity, revenuesupcoming y revenuescalc) y calculamos el porcentaje de asistencia . Tenemos en cuentas que ciertos datos numericos se encuentran en formato string por lo cual al aplicar "number" hacemos la conversion.-

categoryPastData.forEach(category => {
  let assistanceSuma = 0;
  category.assistance.forEach(assistance => assistanceSuma += Number(assistance));
  category.assistance = assistanceSuma;

  let capacitySuma = 0;
  category.capacity.forEach(capacity => capacitySuma += Number(capacity));
  category.capacity = capacitySuma;

  let totalRevenuesCalc = 0;
  category.revenuesCalc.forEach(revenuesCalc => totalRevenuesCalc += Number(revenuesCalc))
  category.revenuesCalc = totalRevenuesCalc

  category.porcentageAttendace = ((assistanceSuma * 100) / capacitySuma).toFixed(); // el toFixed nos otorgara valores numericos redondeados.
})
console.log(categoryPastData)

// function table THREE

function thirdTable() {
  let tableThree = `<tr class= "subtitleTable">
                      <td class="titleTable">Categories</td>
                      <td class="titleTable">Revenues</td>
                      <td class="titleTable">Percentage of  attendance</td>
                    </tr>`
                    categoryPastData.forEach(evento => {
                    evento.categoryPastData
                    tableThree += `<tr class= "data-table">
                      <td>${evento.category}</td>
                      <td>$ ${evento.revenuesCalc}</td>
                      <td>${evento.porcentageAttendace}%</td>
                    </tr>`
  
})

document.getElementById("tableThree").innerHTML = tableThree;
}
thirdTable();


}

getData();
