const Joi = require('joi');

const newPasswordSchema = Joi.object().keys({
    password: Joi.number()
        .required()
        .min(5)
        .max(20)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'number.empty'
            ) {
                return new Error('¡La contraseña es obligatoria!');
            } else {
                return new Error(
                    '¡La contraseña debe tener entre 5 y 20 caracteres!'
                );
            }
        }),
});

module.exports = newPasswordSchema;
