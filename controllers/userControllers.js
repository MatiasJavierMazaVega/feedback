const { validationResult } = require('express-validator') 
const Usuario = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('../middlewares/generarToken')



const paginaPrincipal = (req, res) => { 
    //console.log(req);
    res.status(200).json({
        mensaje: "Código 200 - Todo OK!"
    })
}

const paginaError = (req, res) => { 
    console.log('Error');
    res.status(500).send(`<h1>Todo mal!!</h1>`)
}

const paginaLogin = (req, res) => {
    res.status(500).send(`<h1>Pagina para el login</h1>`)
}

const registrarUsuario = async (req, res) => {

//verificar si los datos son correctos
const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            })
        }

    //desestructuramos los datos y lo guardamos en variables
    const { nombre, email, password } = req.body;
    console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);
        
    //verificar si el usuario ya existe
    try {
        let usuarioExiste = await Usuario.findOne({email})
        console.log(usuarioExiste);
         
        if (usuarioExiste) {
            return res.status(400).json({
                errores: 'El usuario ya existe'
            })
        }
    //si no existe creamos un nuevo usuario 
    let nuevoUsuario = new Usuario(req.body);
    console.log(nuevoUsuario);
    
    //creamos la salt para la mezcla con el password
    const salt = bcrypt.genSaltSync();
    console.log(salt);
    console.log(nuevoUsuario.password);

    //mezclamos la salt con el password del usuario
    nuevoUsuario.password = bcrypt.hashSync(password, salt);
    console.log(nuevoUsuario.password);

    //insertamos en la db el nuevo usuario
    nuevoUsuario.save();

    let token = await jwt.generarJsonWebToken(usuarioExiste);
    console.log(token);

    //respondemos a la peticion del cliente si todo va bien
    res.status(200).end('Tus datos fueron recibidos y guardados en la DB')

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            mensaje: 'Nuestros mejores devs estan trabajando para solucionar el problema'
        })
    }

    
}

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    console.log(`${email} - ${password}`);
    try { let usuarioExiste = await Usuario.findOne({email})
    console.log(usuarioExiste.email);
    if (!usuarioExiste) {
        return res.status(400).json({
            errores: 'El mail no esta registrado'
        })
    }
    console.log(usuarioExiste.password);

    const validarPassword = bcrypt.compareSync(password, usuarioExiste.password);
    
    console.log(validarPassword);

    console.log(usuarioExiste);



    if (validarPassword) {
        return res.status(400).json({
            Administracion: 'Bienvenido Administrador'
        })
    } else{
        return res.status(400).json({
            Error: 'Email o password incorrecto'
        }) 
    }
    } catch (error) {
        return res.status(400).json({
            Error: 'Email o password incorrecto'
        })
    }
}


const paginaPrueba = (req, res) => {

        const { nombre, email, password } = req.body;
    
        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            })
        }

        res.status(200).json({
            mensaje: 'User creado'
        })

        console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);

};

module.exports = {
    paginaPrincipal,
    paginaError,
    paginaLogin,
    loginUsuario,
    registrarUsuario,
    paginaPrueba
}