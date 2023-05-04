const Servicio = require('../servicios/productServices')

const traerProductos = (req, res) =>{
 res.status(200).send(`<h1>Te damos todos los productos</h1>`)
}
 


const unProducto = (req, res) =>{
    const id = req.params.id;
    console.log(id);
    res.status(200).json({
        id: req.params.id
    })
}


const errorProductos = (req, res) =>{
    res.status(200).send(`<h1>Error productos</h1>`)
}


const createProductos = (req, res) =>{
    const { nombre, precio, stock } = req.body;

    console.log(`${nombre} - ${precio} -${stock}`);

    Servicio.guardarProducto(req.body);

    

    res.status(200).send(`<h1>Creamos los productos ${nombre} - ${precio} -${stock} </h1>`)
}

const modificarProductos = (req, res) =>{
    res.status(200).send(`<h1>Modificamos los productos</h1>`)
}

const eliminarProductos = (req, res) =>{
    res.status(200).send(`<h1>Eliminamos los productos</h1>`)
}

module.exports = {
    traerProductos,
    unProducto,
    errorProductos,
    createProductos,
    modificarProductos,
    eliminarProductos
}