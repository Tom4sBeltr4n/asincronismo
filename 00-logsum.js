/* 

Definición estructura Callback
Para poder entender el manejo asincrónico de JS, hemos de entender el concepto de callback. Callback es una función que pasamos como argumento a otra para que se ejecute dentro de esta. La podemos traducir como invoinvocable porque es una función que se ejecuta como parte del proceso de invocación de otra función.


Peticiones a APIs usando Callbacks 
Como se sabe, una API (por la sigla inglesa; en español sería IPA) es una interfaz programable de una aplicación; con la que se puede interactuar mediante código para poder tener más capacidades en un programa. 

Para "llamar" a una API o su información, podemos sencillamente usar, desde Postman, el comando "GET" y la URL respectiva para traer su información. 
Para usar desde JS, tenemos que instalar el paquete xmlhttprequest con npm. Luego, se crea un objeto que traiga el paquete y una función (fetchData) cuyo propósito es traer la información del sitio recibiendo como parámetros el URL y una función invoinvocable. Dentro de ella, crearemos una variable que representará la petición. Como método suyo, usaremos open (iniciar una petición) con los argumentos "GET", el parámetro URL de la función y true. Luego, crearemos una función para invocar cada vez que cambie el estado de la petición (onreadystatechange), a la que le daremos por parámetro "event". Dentro de ella, revisaremos que su valor sea 4 (respuesta del servidor lista) y cuando ocurra, revisaremos que el valor del estado de la respuesta sea 200 (todo correcto), y si no, enviaremos un error.

La función invoinvocable de que se pasa como argumento de fetchData tendrá por primer parámetro un error y por segundo un resultado correcto. Esto es así por estándar


Múltiples Peticiones a una API con Callbacks
Aunque es posible realizar peticiones una por una, podemos utilizar una función invoinvocable (callback; que se usa como argumento) para realizar varias simultáneamente. Sin embargo, esto no es siempre buena práctica; podemos entrar en lo que se llama infierno invoinvocable. Esto es malo porque el código se hace difícil de leer y probar.


Vale la pena, como apunte general, recalcar la importancia de una comprensión previa de la información que la API nos va a traer.


Implementando Promesas. 
"promise" es un objeto. Su función es "prometer" al usuario que un evento sucederá o que algún código será ejecutado.

Comprendamos la sintaxis de la promesa: dentro de la función constructora "Promise()" se pone el parámetro Executor(). Executor es una función invoinvocable (callback) que permite inicializar la promesa, y que tiene los parámetros resolve() y reject(). En ambos casos son funciones que podemos usar dependiendo del resultado de la promesa; resolve() para éxito y reject() para fracaso. El contenido de Executor (lo que va entre llaves {}) está a nuestra discreción, pero cuando queramos hacer operaciones asincronas, usaremos resolve(), al que le daremso valor cuando invoquemos a Promise y le fijemos .then(). Cuando algo indeseado suceda, usaremos reject() y su valor será el segundo parámetro de then o catch.

También vale la pena notar que Promise normalmente se ejecuta cuando se carga el archivo. Si la ponemos como resultado de una función, evitamos que se ejecute de modo inmediato, sino sólo cuando la función contenedora sea invocada, permitiendo controlar la promesa a voluntad. 

Al invocar la función que resulta en la promesa, debemos poner en la siguiente línea los métodos "then" y "catch". Ellos nos permitirán decirle a la promesa qué hacer cuando resuelva o rechace. Destaca que .then() puede (= es opcional) tener un segundo parámetro para cubrir el rechazo. También podemos poner varios .then juntos para que funcione como un operador de tubo, es decir, el retorno del primero es un argumento para el lanzamiento del segundo.


Conociendo async y await
"async" y "await" son palabras reservadas dentro de JavaScript que buscan facilitar la lectura de la sintaxis de promesas. Aunque sí emplea la clase "Promise", no utiliza then, sino try{} ... catch {}  (una sintaxis ya usada en otros ámbitos de JavaScript) y funciona con funciones.
Sintaxis:*/
const funciónEntregaPromesas = function ()
{return new Promise((resolve,reject)=>{true ? resolve("potatoe") : reject("chicken")})}

const funciónAsync = async () =>{
  try {
    const invocarPromesa = await funciónEntregaPromesas();
    //(operar lo que debamos con con invocarPromesa, por ejemplo, console.log())
    console.log(invocarPromesa);
  } catch(error) {
    console.error(error)
  };
}

console.log("Acción 1")
funciónAsync()
console.log("Acción que sucede al 'tiempo' que la función Async")
/*
La función "funciónAsync" es asíncrona con respecto al resto del script, pero en su interior es síncrona. Cuando se invoca, se ejecuta mientras el resto del script sucede, dando la apariencia de que sucede después del resto del script, pero no es así.


Callbacks vs Promesas vs Async/Await
Invoinvocables:
- Son simples de escribir y vainilla; fáciles de entender. No usan nueva sintaxis.
- Universales; son portables por ser viejas
- Antiestéticos. 
- Infierno invoinvocable.

Promesas: 
- Fácilmente enlazable
  - Requiere que recordemos darle "return " al final de cada iteración (salvo la última) para que funcione.
- "Poderosas" (?)
- Usa .catch con el error
- Requiere de Babel u otro "polyfill", es decir, una herramienta que pueda funcionar en navegadores más anticuados.

Async+Await
- Usamos try catch, algo más común y tradicional try{}...catch{}
- Más fácil de leer.
- Cada instancia de promesa (cada await) requiere de espera.
- Requiere de "polyfill"
*/ 












//Comentarios puestos en JS por mí a medida que trabajo
/*
Sobre las peticiones XMLHTTPRequest

Entendamos la petición HTTP como el proceso de mandar cortar un trozo de madera a un almacén donde este servicio se ofrezca:

function fetchData(url_api, callback) ---> Envío (del cliente) de una orden en un correo a la maderera con el tipo de madera (url_api) e instrucciones (callback) para el final del corte. Por el nombre de la petición (fetchData) o el encabezado del correo a la maderera, sabemos qué objeto (método) nos pide (puerta, mesa, etc. / GET, POST, DELETE, etc.)

let xhttp = new XMLHttpRequest();//Variable que podemos identificar con el pedido (el corte), con los detalles del cliente.
xhttp.open('GET', url_api, true);//definimos el corte; decidiendo qué diseño (puerta, mesa, etc.) va a tener (method), el material (url) nos lo da la petición. Además, le decimos que no meta la madera al tiempo con otra (async), por práctica general. Esto será leído por la máquina de corte también.
xhttp.onreadystatechange = function(event)//análisis o revisón del proceso de corte. Lo hará el cliente o la empresa (dependiendo del caso) cada vez que cambie algo al cortar la madera; cuando se defina el corte (1; open es invocada), cuando la máquina entrega el 40% de la pieza (2; send es invocada y los encabezados de respuesta están siendo recibidos), cuando otro 40% de la pieza es entregado (3; se está recibiendo el cuerpo de la respuesta tras recibirse la totalidad de las cabeceras) y cuando ya está finalizada la entrega (4; se recibió el total de los datos exitosamente o falló algo). Puede suceder que la máquina no haya funcionado correctamente y en ese caso también se hace análisis. 
if(xhttp.readyState === 4)//revisar el resultado final del corte o el aserrín
if(xhttp.status === 200)//revisar si salió bien el corte (la solicitud)
callback(null, JSON.parse(xhttp.responseText)); //la empresa ejecuta las instrucciones que le dimos en caso de que saliera bien el corte y nos lo traerá a casa
else { //Si salió mal el corte, la empresa nos envía una carta diciendo que falló el pedido, como se lo pedimos
xhttp.send();//Inicia el corte; se envía la madera a la máquina

//Sobre la clase Error
Esta genera un reporte sobre la excepción (línea, etc.) y es más profunda que un simple console.error()
*/