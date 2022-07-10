export default class CategoriasView {
  constructor() {
    this.paginaSeleccionada = '';
    //divs root, Navegación, Productos, Paginación
    this.divRoot = document.getElementById('root');
    this.categoriasContainer = document.getElementById('dynamicNav');
    this.productosContainer =  document.getElementById('productosCont');
    this.divPaginacion = document.getElementById('pagination');
    //Form para busqueda
    this.formBusqueda = document.getElementById('formBusqueda');
    this.inputBuscar = document.getElementById('inputBusqueda');
    this.btnBuscar = document.getElementById('btnBuscar');
  }

  //Devuelve el contenido del input de busqueda de producto
  get busquedaText(){
    return this.inputBuscar.value;
  }

  //Carga las categorías en la navegación (dynamicNav)
  async mostrarCategorias(categorias) {

      //Generamos fragmento para botones de categoría
      const categoriaFragment = document.createDocumentFragment();
      //Insertamos loading mientras modificamos fragmento
      this.divRoot.appendChild(this.loading());
      try {
        //Guarda/Espera la información recibida y genera un botón en el fragmento por cada categoría
        let result = await categorias;
        let newBtn = '';
        //Insertamos 1 botón por cada categoría al fragmento
        for (var i = 0; i < result.categorias.length; i++) {
             newBtn =  this.generarBotonNav(result.categorias[i]);
             categoriaFragment.append(newBtn);
        }
        //Insertamos fragmento en DOM
        this.categoriasContainer.appendChild(categoriaFragment);
        this.divRoot.style.display = 'none';
      } catch (e) {
        console.log(e);
      }
  }

  //Lista los productos
  async insertarProductosEnContainer(data){
    //Generamos fragmentos para productos y paginación
    const productosFragment = document.createDocumentFragment();
    const paginationFragment = document.createDocumentFragment();
    //Guardamos data recibida
    let result = await data.productos ? data.productos : [];
    let paginas = await data.total ? data.total : [0];
    let newProducto = '';
    //Validamos que hay resultados
    if(!result || result.length > 0){
      //Insertamos productos en fragmento
      for (var i = 0; i < result.length; i++) {
           newProducto = this.generarTarjetaProducto(result[i]);
           productosFragment.append(newProducto);
      }
      //Se inserta paginación, Math.ceil para redondear al número superior
      for (var i = 0; i < Math.ceil(paginas[0].totalProductos/6); i++) {
        paginationFragment.append(this.generarBotonPaginacion(i));
      }
      //Limpiamos e insertamos fragmentos de productos y paginación en DOM
      this.limpiarContainerProductos();
      this.productosContainer.appendChild(productosFragment);
      this.divPaginacion.appendChild(paginationFragment);
     }
     console.log('No hay productos')
    }

  //Cambia la categoría actual (no confundir con cambiar página)
  cambiarCategoria(handler){
      //Recibe cambiarCategoria del controller
      this.categoriasContainer.addEventListener('click', event => {
        //Obtiene id de categoría seleccionada y lo envía al controller
        this.paginaSeleccionada = event.target.id;
        this.limpiarContainerProductos();
        this.productosContainer.appendChild(this.loading());
        handler(event.target.id)
      })
  }

  //Cambia la página actual de productos (no confundir con cambiar categoría)
  cambiarPagina(handler){
    //Recibe cambiarPagina del controller
    this.divPaginacion.addEventListener('click', event => {
      //Obtiene categoría actual y página seleccionada por el usuario y lo envñia al controller
      //La categoría actual se va actualizando en this.paginaSeleccionada
      this.limpiarContainerProductos();
      this.productosContainer.appendChild(this.loading());
      handler(this.paginaSeleccionada, event.target.textContent)
    })
  }

  //Busca productos por nombre
  buscarProducto(handler){
    //Recibe buscarPorNombre del controller
    this.formBusqueda.addEventListener('submit', event => {
      //Obtiene el contenido del input de búsqueda y lo envía al controller
      this.limpiarContainerProductos();
      this.productosContainer.appendChild(this.loading());
      event.preventDefault();
      handler(this.busquedaText);
      this.inputBuscar.value = '';
    })
  }

  //Limpia contenido actual de dynamicNav
  limpiarContainerProductos(){
      this.productosContainer.replaceChildren();
      this.divPaginacion.replaceChildren();
  }

  //Boton para Categorias (nav)
  generarBotonNav(data) {
      const newCategoria = data;
      let tag = document.createElement('li');
      let a = document.createElement('button');
      //Agregamos clases de Bootstrap
      tag.classList.add('nav-item');
      a.classList.add('btn', 'btn-light');
      a.setAttribute('id', newCategoria.id);
      //Contenido a mayúsculas
      a.textContent = newCategoria.name.toUpperCase();
      //Unimos elementos
      tag.appendChild(a);

      return tag;
  }
  //Tarjeta de producto
  generarTarjetaProducto(dataProducto){
      const nuevoProducto = dataProducto;
      const noImgUrl = 'https://medicaercanarias.com/wp-content/uploads/2019/09/x.jpg'

      let header = document.createElement('div');
      let img = document.createElement('img');
      let card = document.createElement('div');
      let cardBody = document.createElement('div');
      let nameProducto = document.createElement('p');
      let precioProducto = document.createElement('p');
      let botonComprar = document.createElement('button');

      //Se agrega clases de Bootstrap y css en general
      header.classList.add('card-header');
      img.classList.add('card-img-top', 'imagenProducto');
      card.classList.add('card', 'col-md-3','miCard');
      cardBody.classList.add('card-body');
      precioProducto.classList.add('card-text');
      botonComprar.classList.add('btn', 'btn-primary', 'btnAgregar');

      //Si tiene imagen devuelve el link, si no hay imagen utiliza la imagen de respaldo 'noImgUrl'
      img.setAttribute('src' ,`${nuevoProducto.url_image ? nuevoProducto.url_image : noImgUrl}`);
      card.setAttribute('id', nuevoProducto.id);
      //Datos de producto
      header.textContent = nuevoProducto.name;
      precioProducto.textContent = `Precio: $${this.addDots(nuevoProducto.price)}`;
      botonComprar.textContent = 'Agregar'
      //Unimos todos los elementos
      cardBody.appendChild(precioProducto);
      card.appendChild(header)
      card.appendChild(img);
      card.appendChild(cardBody);
      card.appendChild(botonComprar);
      return card;
  }
  //boton de paginación
  generarBotonPaginacion(page){
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.classList.add('padge-item');
    a.classList.add('page-link');
    //Para no comenzar desde 0, +1
    a.textContent = `${page+1}`;
    li.appendChild(a);
    return li;
  }

  //loading
  loading(){
    //Retorna icono de carga
    let documentFragment = document.createDocumentFragment();
    let loadIcon = document.createElement('i');
    //Clases de FontAwesome para hacer girar y aumentar tamaño
    loadIcon.classList.add('fa-solid', 'fa-spinner', 'fa-spin-pulse', 'fa-4x', 'loading')
    documentFragment.appendChild(loadIcon);
    //this.productosContainer.appendChild(documentFragment);
    return documentFragment;
  }

  //Muestra mensaje en el container de productos
  mensajeEnProductContent(mensaje){
    this.limpiarContainerProductos();
    let documentFragment = document.createDocumentFragment();
    const noConnResul = document.createElement('div');
    noConnResul.textContent = mensaje;
    documentFragment.appendChild(noConnResul);

    this.productosContainer.appendChild(documentFragment);
  }

  //utils, solo lo utiliza  tarjeta de productos, por el momento, tambien deberia usarlo carrito
  //Agrega puntos a precios
  addDots(nStr){
      nStr += '';
      let x = nStr.split('.');
      let x1 = x[0];
      let x2 = x.length > 1 ? '.' + x[1] : '';
      let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {    ///WHAT???
            x1 = x1.replace(rgx, '$1' + '.' + '$2'); // changed comma to dot here
        }
        return x1 + x2;
    }

}
