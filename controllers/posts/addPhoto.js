/* 
    Controlador que permite añadir una nueva foto de producto
*/

const getDB = require('../../db/getDB');
const { generateError} = require('../../helpers/error');


const addProductPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Destructuramos el id del producto
        const { idProduct } = req.params;

        // Vamos a permitir un máximo de 5 fotos por producto
        // Comprobamos cuantas fotos tiene ya el producto
        const [photos] = await connection.query(
            `SELECT * FROM product_photo WHERE idProduct = ?`,
            [idProduct]
        );

        // Si nos devuelve 5 o más fotos para ese producto, lanzamos un error
        if (photos.length >= 5) {
            throw generateError(
                '¡El producto ya tiene el máximo de 5 fotos asignadas!',
                403
            ); // Forbidden
        }

        // Comprobamos que nos ha enviado una foto nueva para añadir
        if (!req.files || !req.files.productPhoto) {
            throw generateError(
                '¡Debes indicar una nueva foto de producto!',
                400
            ); // Bad Request
        }

        // Ejecutamos la funcion savePhoto para guardar en el servidor la nueva foto de producto
        // y guardamos en la variable photoName el nombre de la imagen que devuelve la función
        const photoName = await savePhoto(req.files.productPhoto, 1); // 1 -> indica que lo guardamos en static/product

        // Insertamos el nombre de la nueva foto
        await connection.query(
            `INSERT INTO product_photo (name, idProduct)
            VALUES (?, ?)`,
            [photoName, idProduct]
        );

        // Respondemos
        res.send({
            status: 'Ok',
            message: '¡Foto de producto añadida con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addProductPhoto;
