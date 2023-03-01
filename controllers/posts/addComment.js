const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const addComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUserAuth = req.userAuth.id;

        const { idPhoto } = req.params;

        const [photo] = await connection.query(
            `SELECT * FROM photo WHERE id = ?`,
            [idPhoto]
        );

        const [comment] = await connection.query(
            `SELECT * FROM user_comment_photo WHERE idUser = ? AND idPhoto = ?`,
            [idUserAuth, idPhoto]
        );

        await connection.query(
            `INSERT INTO user_comment_photo (idUser, idPhoto)
            VALUES (?, ?)`,
            [idUserAuth, idPhoto]
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
