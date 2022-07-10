export default class CategoriasModel {
  constructor() {
    this.categorias = this.solicitudCategorias() || [];
    //this.productos = [];
  }

  getUrlApi(solicitud){
    let url = `https://simplestore-api.onrender.com/${solicitud}`
    return url;
  }

  rellenarContenido(callback) {
    this.onProductosChanged = callback;
  }

async solicitudCategorias() {
    //Solicita categorías a API
    let response = await fetch(this.getUrlApi('categorias'));
    let categorias = await response.json();
    return categorias;
  }

async obtenerProductosPorCategoria(id, page) {
      //Encaso de no recibir page (cambio de categoría) asignamos por defecto page = 1
      const toPage = page ? page : 1
      let response = await fetch(`${this.getUrlApi('productosByCategoria')}?id=${id}&page=${toPage}`);
      let data = await response.json();
      this.onProductosChanged(data);
      return data;
  }

async obtenerProductosPorNombre(name) {
    let response = await fetch(`${this.getUrlApi('productos')}/${name}`);
    let data = await response.json();
    this.onProductosChanged(data);
    return data;
  }

}
