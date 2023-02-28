const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const addComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUserAuth = req.userAuth.id;

        const { idPost } = req.params;

        const [post] = await connection.query(
            `SELECT * FROM post WHERE id = ?`,
            [idPost]
        );

        const [comment] = await connection.query(
            `SELECT * FROM user_comment_post WHERE idUser = ? AND idPost = ?`,
            [idUserAuth, idPost]
        );

        await connection.query(
            `INSERT INTO user_comment_post (idUser, idPost)
            VALUES (?, ?)`,
            [idUserAuth, idPost]
        );

        res.send({
            status: 'Ok',
            message: `¡Foto con comentario!`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addComment;
