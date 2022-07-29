const {icecream} = require("../models/articulos")
const validarId = async (req, res, next) => {
const helados = await icecream.findById(req.params.id)
if (helados !== null){
    next();
}else{
    res.json({msg:"el id es invalido"})
}
}
module.exports = {validarId}