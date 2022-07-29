// const res = require('express/lib/response');
const {icecream} = require('../models/articulos')
const { check, validationResult, body, } = require("express-validator");
const axios = require('axios');
const bcrytpt = require('bcryptjs');

const vistaUno = (req,res)=>{
    res.render('index', { title: 'Express' });
}

const vistaHelados = async (req,res) =>{
     const helados = await icecream.find()
     res.send(helados)
}
const vistaUnicaHelado = async (req,res) =>{

    try{
     const helado = await icecream.findById(req.params.id)
     res.json({helado})
    } catch (error) {
     res.status(400).json({msg:"error en el id",error})
    }
    
}
const crearHelado = async (req,res) =>{
    try{
        const error = validationResult(req)
        if (error.isEmpty()) {

            // sabor no debe estar vacio(sino enviar mensaje)
            // sabor debe tener mas de 4 caracteres y menos de 15
            // const saboresValidation = check("sabores")
            // console.log('RESPUESTA: ', saboresValidation)

            // if () {

            // }
            const {sabores, envases, toppin, precio} = req.body
            const helado = new icecream ({ sabores,envases, toppin,precio });
            await helado.save()
            res.status(201).json({helado, msg: 'ummm'})
        } else {
            res.status(501).json(error)
        }
    } catch (err) {
        res.status(501).json({msg: "no se pudo guardar el articulo, intenta mas tarde", err})
    }   
}

const editarHelado = async (req,res) => {
    try{
        const error = validationResult (req)
        if(error.isEmpty()){
         const {id} = req.params
         const update = await icecream.findByIdAndUpdate(id, req.body)
         res.status(202).json({sabores: req.body.sabores, update})
         res.status(202).json({envases: req.body.envases, update})
         res.status(202).json({toppin: req.body.toppin, update}) 
         res.status(202).json({precio: req.body.precio, update})
        } else {
            res.status(501).json(error)
        }
    } catch (error) {
     res.status(501).json({msg: "esta informacion ya existe en la base de datos",error})
    }
}
const borrarHelado = async (req, res) => {
    console.log('HERE: --> ', req.params)

    try{
        const helado = await icecream.findByIdAndDelete(req.params.id)
        res.json({msg: "eliminado", helado})
    } catch (error) {
      res.status(400).json({msg: "error al borrar informacion"})
    }
}
const consultaAxios = async (req,res) => {
    try{
        const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto", { timeout:10000})
        res.json({status: respuesta.status, data:respuesta.data})
    } catch (error) {
        res.json({status: error.response.status, data: error.response.data})
}
}

module.exports = {vistaUno, vistaHelados, vistaUnicaHelado, crearHelado, editarHelado, borrarHelado, consultaAxios}