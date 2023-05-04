const Producto = require('../models/productModels');


const guardarProducto = (producto) => {
    Producto.create(producto)
}

const buscarProductos = () => {
    
    const todos = Producto.find({}, {"nombre": 1, "precio": 1, "stock": 1});
    return todos;

}



module.exports = {
    guardarProducto,
    buscarProductos,
}