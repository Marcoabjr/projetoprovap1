/* Importar o mongoose */

const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    senha: String

})

/* exportar */

module.exports = User


