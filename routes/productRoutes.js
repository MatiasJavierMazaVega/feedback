
const express = require('express');
const router = express.Router();
const {
 traerProductos,
 unProducto,
 errorProductos,
 createProductos,
 modificarProductos,
 eliminarProductos
} = require('../controllers/productControllers')

router.get('/', traerProductos);
router.get('/:id', unProducto);

router.get('/error', errorProductos);

router.post('/', createProductos);
router.post('/update/:id', modificarProductos);
router.post('/delete/:id', eliminarProductos);








module.exports = router;