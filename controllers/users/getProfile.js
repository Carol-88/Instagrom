const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getProfile = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.params;

        const [[user]] = await connection.query(
            'SELECT id, username, name, lastname, avatar, birthday FROM user WHERE id = ?',
            [idUser]
        );

        if (!user) {
            throw generateError('¡El usuario no existe!', 404);
        }

        const [posts] = await connection.query(
            'SELECT * FROM post WHERE idUser = ?',
            [idUser]
        );

        user.posts = posts;

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
