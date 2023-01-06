const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const photoByCaption = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { caption } = req.body;

        const [photo] = await connection.query(
            `SELECT * FROM photo WHERE caption = ?`,
            [caption]
        );

        if (photo.length < 1) {
            throw generateError('¡No existe la foto!', 404);
        }

        res.send({
            status: 'Ok',
            message: `${photo[0].photoName}`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = photoByCaption;
