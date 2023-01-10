const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteFavPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUserAuth = req.userAuth.id;

        const { idPhoto } = req.params;
        const [[photo]] = await connection.query(
            'SELECT * FROM photo WHERE id = ?',
            [idPhoto]
        );

        if (!photo) {
            throw generateError('¡La foto no existe!', 404);
        }

        const [like] = await connection.query(
            `SELECT * FROM user_like_photo WHERE idUser = ? AND idPhoto = ?`,
            [idUserAuth, idPhoto]
        );

        if (like.length < 1) {
            throw generateError('¡La foto no consta como favorita!', 404);
        }

        await connection.query(
            `DELETE FROM user_like_photo WHERE idUser = ? AND idPhoto = ?`,
            [idUserAuth, idPhoto]
        );

        res.send({
            status: 'Ok',
            message: '¡Like eliminado!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteFavPhoto;
