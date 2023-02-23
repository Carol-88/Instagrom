const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteComment = async (req, res, next) => {
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

        const [comment] = await connection.query(
            `SELECT * FROM user_comment_photo WHERE idUser = ? AND idPhoto = ?`,
            [idUserAuth, idPhoto]
        );

        if (comment.length < 1) {
            throw generateError('¡No se encuentra el comentario!', 404);
        }

        await connection.query(
            `DELETE FROM user_comment_photo WHERE idUser = ? AND idPhoto = ?`,
            [idUserAuth, idPhoto]
        );

        res.send({
            status: 'Ok',
            message: '¡Comentario eliminado!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteComment;
