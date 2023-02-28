const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUserAuth = req.userAuth.id;

        const { idPost } = req.params;
        const [[post]] = await connection.query(
            'SELECT * FROM post WHERE id = ?',
            [idPost]
        );

        if (!post) {
            throw generateError('¡La foto no existe!', 404);
        }

        const [comment] = await connection.query(
            `SELECT * FROM user_comment_post WHERE idUser = ? AND idPost = ?`,
            [idUserAuth, idPost]
        );

        if (comment.length < 1) {
            throw generateError('¡No se encuentra el comentario!', 404);
        }

        await connection.query(
            `DELETE FROM user_comment_post WHERE idUser = ? AND idPost = ?`,
            [idUserAuth, idPost]
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
