//AKA challenge.js
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';
//Entendamos la petición HTTP como el proceso de mandar cortar un trozo de madera a un almacén donde este servicio se ofrezca
function fetchData(url_api, callback)
{//Envío (del cliente) de una orden en un correo a la maderera con el tipo de madera (url_api) e instrucciones (callback) para acatar al final del corte. Por el nombre de la petición (fetchData) o el encabezado del correo a la maderera, sabemos qué objeto (método) nos pide (puerta, mesa, etc. / GET, POST, DELETE, etc.)
  let xhttp = new XMLHttpRequest();//Variable que podemos identificar con el pedido (el corte), con los detalles del cliente. En términos más técnicos de JS, este es el constructor del objeto xhttp.
  xhttp.open('GET', url_api, true);//definimos el corte; decidiendo qué diseño (puerta, mesa, etc.) va a tener (method), el material (url) nos lo da la petición. Además, le decimos que meta nuestra madera al tiempo con otros trabajos (async), por práctica general. Esto será leído por la máquina de corte también.
  xhttp.onreadystatechange = function()//análisis o revisón del proceso de corte. Lo hará el cliente o la empresa (dependiendo del caso) cada vez que cambie algo al cortar la madera; cuando se defina el corte (1; open es invocada), cuando la máquina entrega el 40% de la pieza (2; send es invocada y los encabezados de respuesta están siendo recibidos), cuando otro 40% de la pieza es entregado (3; se está recibiendo el cuerpo de la respuesta tras recibirse la totalidad de las cabeceras) y cuando ya está finalizada la entrega (4; se recibió el total de los datos exitosamente o falló algo). Puede suceder que la máquina no haya funcionado correctamente y en ese caso también se hace análisis. 
  {
    if(xhttp.readyState === 4)//revisar el resultado final del corte o el aserrín
    {
      if(xhttp.status === 200)//revisar si salió bien el corte (la solicitud)
      {
        callback(null, JSON.parse(xhttp.responseText)); //la empresa ejecuta las instrucciones que le dimos en caso de que saliera bien el corte y nos lo traerá a casa
      } else { //Si salió mal el corte, la empresa nos envía una carta diciendo que falló el pedido, como se lo pedimos
        const error = new Error('Error ' + url_api);
        return callback(error, null);
      }
    }
  }
  xhttp.send();//Inicia el corte; se envía la madera a la máquina
}

fetchData(API, function (error1, data1)
{
  if(error1) return console.error(error1);
  //Entendamos el resultado que estamos trayendo: es un archivo JavaScript Object Notation (JSON; un objeto) que trae información, principalmente texto, sobre los personajes de la serie Rick & Morty. Este objeto, a su vez, tiene sólo 2 propiedades: "info" y "results". "info" es un objeto, mientras que "results" es un array. Dentro de "results" encontraremos un personaje (en forma de objeto de JS) en cada ítem. Estos objetos tienen varias propiedades, entre ellas, "id", que es un número.
  fetchData(API + data1.results[0].id, function(error2, data2)//aparentemente los personajes tienen JSONs independientes bajo la misma URL tras concatenarle el id del personaje.
  {
    if(error2) return console.error(error2);
    fetchData(data2.origin.url, function (error3, data3)
    {
      if(error3) return console.error(error3);
      console.log(data1.info.count);
      console.log(data2.name);
      console.log(data3.dimension);
    });//Hay que tener cuidado con repetir varias veces el callback
  });
});