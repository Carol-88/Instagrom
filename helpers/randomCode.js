const crypto = require('crypto');

// Función que genera un código aleatorio para validar al usuario
function randomCode(length) {
    return crypto.randomBytes(length).toString('hex');
};

module.exports = randomCode;

