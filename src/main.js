import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '../public/css/main.css'
import CategoriasController from './Controllers/CategoriasController.js'
import CategoriasModel from './Models/CategoriasModel.js'
import CategoriasView from './Views/CategoriasView.js'

//La API genera un mensaje personalizado el cual verificamos para saber si la API esta funcionando
//Mensaje: "API ON"
if(await checkConexion() === 'API ON'){
  //Si hay conexion instanciamos la clase de Categorias
  const categorias = new CategoriasController(new CategoriasModel(), new CategoriasView());
  }else {
  console.log('No hay conexión con la API');
}

async function checkConexion(){
  let status;
  //Realiza un fetch, la respuesta es API ON en caso de existir conexion con la API //igual a response.ok
  try {
    let response = await fetch('https://simplestore-api2.onrender.com');
    status = await response.json();
  } catch (e) {
    console.log(e.message);
  }
  //console.log(status)
  return status;
}
