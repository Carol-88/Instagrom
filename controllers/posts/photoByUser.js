const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const photoByUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { username } = req.params;

        const [user] = await connection.query(
            `SELECT * FROM user WHERE username = ?`,
            [username]
        );

        if (user.length < 1 || user[0].active === 1) {
            throw generateError('¡No existe el usuario!', 409);
        }

        const [photos] = await connection.query(
            `SELECT * FROM photo WHERE idUser = ?`,
            [user[0].id]
        );

        if (photos.length < 1) {
            throw generateError('¡Este usuario no tiene fotos!', 409);
        }

        res.send({
            status: 'Ok',
            message: `${photos}`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = photoByUser;
