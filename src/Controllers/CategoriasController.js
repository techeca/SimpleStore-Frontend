export default class CategoriasController {
  constructor(model, view){
    this.model = model;
    this.view = view;

    this.model.rellenarContenido(this.onProductosChanged);
    this.view.cambiarCategoria(this.cambiarCategoria);
    this.view.cambiarPagina(this.cambiarPagina);
    this.view.buscarProducto(this.buscarPorNombre);

    //Se obtienen las categorías desde modelo
    this.onCategoriasChanged(this.model.categorias);
  }

  onCategoriasChanged = categorias => {
    //Entrega categorías a view
    this.view.mostrarCategorias(categorias);
  }

  onProductosChanged = productos => {
    //Recibe productos desde modelo
    //En caso de búsqueda se valida que encontramos mínimo 1 producto
    if(productos.productos.length > 0){
      //Se entregan productos a view
      this.view.insertarProductosEnContainer(productos);
    }else {
      this.view.mensajeEnProductContent('No tenemos ese Producto :(');
    }
  }

  cambiarCategoria = (id) => {
    //Recibe id de categoría desde view y la entrega a modelo para solicitar productos
    this.model.obtenerProductosPorCategoria(id);
  }

  cambiarPagina = (id, page) => {
    //Recibe categoría actual más la página seleccionada por el usuario desde view
    //Se envían a modelo para obtener productos *La API responde con 6 productos más el total de productos para crear paginado
    this.model.obtenerProductosPorCategoria(id, page);
  }

  buscarPorNombre = (name) => {
    //Validamos que el input de búsqueda tenga contenido
    if(name.length > 0){
      //Recibe contenido del input de búsqueda y lo envía a model para buscar producto
      this.model.obtenerProductosPorNombre(name);
    }else {
      this.view.mensajeEnProductContent('Debes ingresar un texto para poder buscar :/')
    }
  }

}
