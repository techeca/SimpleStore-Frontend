# SimpleStore
Tienda online simple en la que puede ver y buscar productos, el Frontend consume API que a su vez realiza solicitudes a la base de datos proporcionada.

## Instalación Frontend
Desde la carpeta de su preferencia ejecute el siguiente comando:
```
git clone -b Frontend https://github.com/techeca/storeJS.git Frontend
```

Ingrese al repositorio descargado:
```
cd Frontend
```

Instale depencias:
```
npm i
```

Para realizar pruebas:
```
npm run serve
```
http://localhost:8080

### Detalles de Frontend
Se utiliza Webpack y Babel para poder estructurar, en `/webpack.config.js` encontrará todos los archivos utilizados (importados) en el proyecto con su ruta correspondiente.

El archivo `main.js` se encarga de realizar el primer chequeo con la API y luego instanciar las clases.
```javascript
//webpack.config.js
  entry: {
    main:"./src/main.js",
    CategoriasModel:"./src/Models/CategoriasModel.js",
    CategoriasView:"./src/Views/CategoriasView.js",
    CategoriasController:"./src/Controllers/CategoriasController.js",
  },
```
Instancia de categorias en `main.js`
```javascript
 const categorias = new CategoriasController(new CategoriasModel(), new CategoriasView());
```
Esta instancia se encarga de solicitar/cargar los productos según la categoría seleccionada y controla el form de búsqueda.  

#### Controller
Recibe modelo y vista en su constructor, tiene definida las siguientes funciones.\
`onCategoriasChanged`: Se ejecuta cuando el modelo tiene datos para categorías.\
`onProductosChanged`:  Se ejecuta cada vez que los productos a mostrar son cambiados.\
`cambiarCategoria`: Recibe id de categoría, ejecuta la función `obtenerProductosPorCategoria` del modelo.\
`cambiarPagina`: Recibe id de categoria y página, ejecuta la función `obtenerProductosPorCategoria` del modelo. \
`buscarPorNombre`: Recibe el texto a buscar, ejecuta la función `obtenerProductosPorNombre` del modelo.

Se entregan funciones a Model y View recibido en el constructor.
```javascript
this.model.rellenarContenido(this.onProductosChanged);
this.view.cambiarCategoria(this.cambiarCategoria);
this.view.cambiarPagina(this.cambiarPagina);
this.view.buscarProducto(this.buscarPorNombre);
````

#### Model
`this.categorias`: Guarda las categorías obtenidas desde la API.\
`this.productos`: Guarda los productos solicitados a la API.

`getUrlApi`: Punto en común para entregar url de API, recibe texto para personalizar url.\
`rellenarContenido`: Actualiza los productos solicitados, recibe `onProductosChanged`.\
`solicitudCategorias`: Solicita categorías a API.\
`obtenerProductosPorCategoria`: Recibe id de categoría y página, por defecto la página es 1, retorna los productos y total de productos de esa categoría.\
`obtenerProductosPorNombre`: Recibe texto para buscar, retorna todos los productos con nombre similar.

#### View
En el constructor se generan elementos a los que se hace referencia en `index.html`, los cuales son `dynamicNav`, `productosCont`, `pagination` y los elementos de búsqueda `formBusqueda`, `inputBusqueda`, `btnBuscar`.

```javascript
this.categoriasContainer = document.getElementById('dynamicNav');
this.productosContainer =  document.getElementById('productosCont');
this.divPaginacion = document.getElementById('pagination');
this.formBusqueda = document.getElementById('formBusqueda');
this.inputBuscar = document.getElementById('inputBusqueda');
this.btnBuscar = document.getElementById('btnBuscar');
```

`busquedaText`: Obtiene el contenido del input de búsqueda.\
`mostrarCategorias`: Carga los botones de categoría.\
`insertarProductosEnContainer`: Inserta los productos solicitados por el usuario.\
`cambiarCategoria`: Evento que se activa con `click` en `categoriasContainer`.\
`cambiarPagina` : Evento que se activa con `click` en `divPaginacion`.\
`buscarProducto`: Evento que se activa con `submit` en `formBusqueda`.\
`limpiarContainerProductos`: Limpia nodos de `categoriasContainer` y `divPaginacion`.

Las funciones `generarBotonNav`, `generarTarjetaProducto` y `generarBotonPaginacion` retornan un fragmento que luego es insertardo 1 o n veces.

Utilidad\
`loading`: Inserta un fragmento con un spinner (icono de loading).

#### Index

Se utiliza como referencia el archivo `index.html` ubicado en `/`.
```javascript
//webpack.config.js
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
```
En `index.html` los siguientes elementos son utilizados por las clases:

Contenedor para insertar los botones de las categorías.
```html
<ul id="dynamicNav" class="navbar-nav mr-auto">
    <!-- Categorías cargadas al solicitar a API -->
</ul>
```

Form para realizar la búsqueda de productos.
```html
<form id="formBusqueda" class="form-inline my-2 my-lg-0">
    <input id="inputBusqueda" class="form-control mr-sm-2" type="search" placeholder="Ingresa una palabra" aria-label="Search">
    <button id="btnBuscar" type="submit" class="btn btn-outline-success my-2 my-sm-0">Buscar</button>
</form>
```

Contenedor para insertar los productos según la categoría seleccionada.
```html
<div id="productosCont" class='row justify-content-md-center'>
    Selecciona una categoría desde el menú de navegación.
</div>
```
Contenedor para paginación de productos
```html
 <ul id="pagination" class="pagination">
  </ul>
```

####  Build
Al realizar `npm run build:dev` se genera la web en la carpeta `/dist`.
```javascript
//webpack.config.js
  output: {
    path: path.resolve(__dirname, "dist"),
  },
```

# Demo
Fue utilizado [Render](https://render.com) para alojar Frontend y API.

[Frontend](https://simplestore-front.onrender.com)

# Img

![Screenshot from 2022-06-12 01 25 34](https://user-images.githubusercontent.com/53408118/173217082-7551629d-dd13-49a9-b444-3643e82a73c5.png)
![2](https://user-images.githubusercontent.com/53408118/172822106-ad41e86e-508b-4ddd-902d-45bbf3a6d531.PNG)
![3](https://user-images.githubusercontent.com/53408118/173252441-0d22611c-59f5-4d29-ba14-fb2a0287940a.PNG)
