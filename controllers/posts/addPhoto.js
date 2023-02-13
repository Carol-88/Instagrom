const getDB = require('../../db/getDB');
const { savePhoto } = require('../../helpers');

const addPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { caption } = req.body;

        const photoName = await savePhoto(req.files.photo);

        await connection.query(
            `INSERT INTO photo (caption, idUser)
            VALUES (?, ?)`,
            [caption, req.userAuth.id]
        );

        res.send({
            status: 'Ok',
            message: '¡Foto subida con éxito!',
        });
        if (!req.files?.photo) {
            throw generateError('¡Debes subir una foto!', 400);
        }
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addPhoto;
