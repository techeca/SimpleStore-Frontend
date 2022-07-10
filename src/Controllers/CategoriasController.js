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
    this.view.mostrarCategorias(categorias);
  }

  onProductosChanged = productos => {
    if(productos.productos.length > 0){
      this.view.insertarProductosEnContainer(productos);
    }else {
      this.view.mensajeEnProductContent('No tenemos ese Producto :(');
    }
  }

  cambiarCategoria = (id) => {
    this.model.obtenerProductosPorCategoria(id);
  }

  cambiarPagina = (id, page) => {
    this.model.obtenerProductosPorCategoria(id, page);
  }

  buscarPorNombre = (name) => {
    if(name.length > 0){
      this.model.obtenerProductosPorNombre(name);
    }else {
      this.view.mensajeEnProductContent('Debes ingresar un texto para poder buscar :/')
    }
  }

}
