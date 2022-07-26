const express = require('express');
const router = express.Router();
const {vistaHelados, crearHelado, vistaUnicaHelados} = require('..//controllers/controllers.js')

router.get('/ver', vistaHelados);
router.get('/ver/:id',vistaUnicaHelados);
router.post('/crear',crearHelado);

module.exports = router;