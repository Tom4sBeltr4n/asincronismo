// callback function type examples
function sum(n1, n2)
{
  return n1 + n2;
}

function calc(n1, n2, callback)
{
  return callback(n1, n2);
}

console.log(calc(2, 2, sum));

function date(callback)
{
  console.log(new Date);
  setTimeout
  (
    function ()
    {
      let date = new Date;
      callback(date);
    }, 3000
  );
}

function printDate(dateNow)
{
  console.log(dateNow);
}

date(printDate);

//Promise example

const somethingWillHappen = () =>
{
  //para comprender la sintaxis de la promesa: dentro de la función constructora "Promise()" se pone el parámetro Executor(). Executor es una función invoinvocable (callback) que permite inicializar la promesa, y que tiene los parámetros resolve() y reject(). En ambos casos son funciones que podemos usar dependiendo del resultado de la promesa; resolve() para éxito y reject() para fracaso. En este caso, usaremos una arrow function para inicializar a "Executor". También vale la pena notar que ponemos Promise como resultado para evitar que se ejecute de modo inmediato, sino cuando somethingWillHappen sea invocada, permitiendo controlar la promesa
  return new Promise((resolve, reject) => {
    if(true)
    {
      resolve('Hey!');
    } else {
      reject('Whooops!');
    }
  });
};

somethingWillHappen()
  .then(response => console.log(response))//al invocar la promesa, debemos poner en la siguiente línea los métodos "then" y "catch". Ellos nos permitirán decirle a la promesa qué hacer cuando resuelva o rechace. Destaca que .then() puede (= es opcional) tener un segundo parámetro para cubrir el rechazo.
  .catch(err => console.error(err));

const somethingWillHappen2 = () =>
{
  return new Promise((resolve, reject) => 
  {
    if(true)
    {
      setTimeout(()=>
      {
        resolve('True');
      }, 2000)
    } else {
      const error = new Error('Whoop!');//Class Error sends a better throw debugging output
      reject(error);
    }
  });
}

somethingWillHappen2()
  .then(response => {console.log(response)})
  .catch((err) => console.error(err));

Promise.all([somethingWillHappen(),somethingWillHappen2()])
  .then(response =>
    {
      console.log('Array of results:', response)
    })
  .catch(err => 
    {
      console.error(err);
    });

const doSomethingAsync = () =>
{
  return new Promise((resolve, reject) =>
  {
    true ? setTimeout(() => resolve(new Date), 3000) : reject(new Error('Test Error'))
  });
}

const doSomething = async () => {
  const something = await doSomethingAsync();
  console.log(something);
}

console.log(new Date +' before:: 1');
doSomething();
doSomethingAsync();

const anotherFunction = async () =>
{
  try{
    const something = await doSomethingAsync();//
    console.log(something);
  } catch(error){
    console.error(error)
  }
}
