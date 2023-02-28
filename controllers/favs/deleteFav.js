const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const deleteFavPost = async (req, res, next) => {
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

        const [like] = await connection.query(
            `SELECT * FROM user_like_post WHERE idUser = ? AND idPost = ?`,
            [idUserAuth, idPost]
        );

        if (like.length < 1) {
            throw generateError('¡La foto no consta como favorita!', 404);
        }

        await connection.query(
            `DELETE FROM user_like_post WHERE idUser = ? AND idPost = ?`,
            [idUserAuth, idPost]
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

module.exports = deleteFavPost;
