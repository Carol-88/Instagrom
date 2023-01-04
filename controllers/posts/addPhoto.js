const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const addPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idPhoto } = req.params;

        const [photos] = await connection.query(
            `SELECT * FROM photo WHERE idPhoto = ?`,
            [idPhoto]
        );

        if (photos.length >= 5) {
            throw generateError('¡Ya tienes 5 fotos subidas!', 403);
        }

        if (!req.files || !req.files.photo) {
            throw generateError('¡Debes subir una nueva foto!', 400);
        }

        const photoName = await savePhoto(req.files.photo, savePhoto);

        await connection.query(
            `INSERT INTO photo (name, idPhoto, caption)
            VALUES (?, ?)`,
            [photoName, idPhoto, caption]
        );

        res.send({
            status: 'Ok',
            message: '¡Foto subida con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addPhoto;
