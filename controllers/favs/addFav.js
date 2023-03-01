const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const addFavPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUserAuth = req.userAuth.id;

        const { idPhoto } = req.params;

        const [photo] = await connection.query(
            `SELECT * FROM photo WHERE id = ?`,
            [idPhoto]
        );

        if (photo[0].idUser === idUserAuth) {
            throw generateError(
                'No le puedes dar like a tus propias fotos',
                409
            );
        }

        const [like] = await connection.query(
            `SELECT * FROM user_like_photo WHERE idUser = ? AND idPhoto = ?`,
            [idUserAuth, idPhoto]
        );

        if (like.length > 0) {
            throw generateError('¡Esa foto ya tiene like!', 409);
        }

        await connection.query(
            `INSERT INTO user_like_photo (idUser, idPhoto)
            VALUES (?, ?)`,
            [idUserAuth, idPhoto]
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

module.exports = addFavPhoto;
