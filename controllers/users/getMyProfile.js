const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getProfile = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idUser = req.userAuth.id;

        const [[user]] = await connection.query(
            'SELECT id, username, name, lastname, avatar, birthday FROM user WHERE id = ?',
            [idUser]
        );

        if (!user) {
            throw generateError('¡El usuario no existe!', 404);
        }

        const [photos] = await connection.query(
            'SELECT * FROM photo WHERE idUser = ?',
            [idUser]
        );

        user.photos = photos;

        res.send({
            status: 'Ok',
            data: user,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getProfile;
