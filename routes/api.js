const express = require('express');
const router = express.Router();
const {vistaHelados, crearHelado, vistaUnicaHelado,editarHelado, borrarHelado} = require('../controllers/controllers.js')
const { check, validationResult, body} = require ("express-validator");
const {validarId} = require("../middleware/validar")

router.get("/ver", vistaHelados);
router.get("/ver/:id",validarId, vistaUnicaHelado);

router.post(
    "/crear", 
    [
        check("sabores", "El campo está vacio").notEmpty(),
        check("sabores", "Su helado debe tener un sabor").isLength({max:15, min:4}),
        check("envases", "El campo está vacio").notEmpty(),
        check("precio", "El campo está vacio").notEmpty()
    ],
    crearHelado
)

router.put("/editar/:id",validarId, editarHelado)
router.delete("/eliminar/:id",validarId, borrarHelado)

module.exports = router;