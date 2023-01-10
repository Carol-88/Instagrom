const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteFavPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        // Recuperar el id del usuario logueado
        const idUserAuth = req.userAuth.id;

        // Destructurar el id del producto por path params
        const { idPhoto } = req.params;

        // Consultamos a la base de datos si el producto ha sido marcado por el usuario como favorito
        const [like] = await connection.query(
            `SELECT * FROM user_like_product WHERE idUser = ? AND idPhoto = ?`,
            [idUserAuth, idPhoto]
        );

        // Si la consulta NO devuelve ningún valor, el producto NO está en favoritos
        if (like.length < 1) {
            throw generateError('¡La foto no consta como favorita!', 404); // Not Found
        }

        // Si el producto está marcado como favorito, lo eliminamos
        await connection.query(
            `DELETE FROM user_like_product WHERE idUser = ? AND idPhoto = ?`,
            [idUserAuth, idPhoto]
        );

        // Respondemos
        res.send({
            status: 'Ok',
            message: '¡Foto eliminada de favoritos!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteFavPhoto;

