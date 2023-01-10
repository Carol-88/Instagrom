const Joi = require('joi');

const newPhotoSchema = Joi.object().keys({
    photoName: Joi.string()
        .required()
        .min(5)
        .max(50)
        .regex(/[A-Za-z0-9]/)
        .error((errors) => {
            if (
                errors[0].code === 'any.required' ||
                errors[0].code === 'string.empty'
            ) {
                return new Error('¡El nombre es requerido!');
            } else {
                return new Error(
                    '¡El nombre debe tener entre 5 y 50 caracteres de longitud!'
                );
            }
        }),

    caption: Joi.string()
        .min(10)
        .max(500)
        .error((errors) => {
            if (errors[0].code === 'string.empty') {
                return new Error(
                    '¡La descripción debe tener entre 10 y 500 caracteres como máximo!'
                );
            }
        }),
});

module.exports = newPhotoSchema;
