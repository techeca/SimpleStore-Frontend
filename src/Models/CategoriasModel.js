export default class CategoriasModel {
  constructor() {
    this.categorias = this.solicitudCategorias() || [];
    this.productos = [];
  }

  getUrlApi(solicitud){
    let url = `http://localhost:3000/${solicitud}`
    return url;
  }

  rellenarContenido(callback) {
    this.onProductosChanged = callback;
  }

async solicitudCategorias() {
    //prod https://api-g2zy.onrender.com/
    let response = await fetch(this.getUrlApi('categorias'));
    let categorias = await response.json();
    return categorias;
  }

async obtenerProductosPorCategoria(id, page) {
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
