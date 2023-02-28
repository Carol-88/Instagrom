const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const addFavPost = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUserAuth = req.userAuth.id;

        const { idPost } = req.params;

        const [post] = await connection.query(
            `SELECT * FROM post WHERE id = ?`,
            [idPost]
        );

        if (post[0].idUser === idUserAuth) {
            throw generateError(
                'No le puedes dar like a tus propias fotos',
                409
            );
        }

        const [like] = await connection.query(
            `SELECT * FROM user_like_post WHERE idUser = ? AND idPost = ?`,
            [idUserAuth, idPost]
        );

        if (like.length > 0) {
            throw generateError('¡Esa foto ya tiene like!', 409);
        }

        await connection.query(
            `INSERT INTO user_like_post (idUser, idPost)
            VALUES (?, ?)`,
            [idUserAuth, idPost]
        );

        res.send({
            status: 'Ok',
            message: `¡Foto con like!`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addFavPost;
