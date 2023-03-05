const getDB = require('../../db/getDB');
const { savePhoto, generateError } = require('../../helpers');

const addPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { caption } = req.body;
        const { location } = req.body;
        console.log('CAPTION', req.body);

        if (!req.files?.photo)
            throw generateError('Hay que subir una foto', 500);

        const photoName = await savePhoto(req.files.photo);

        await connection.query(
            `INSERT INTO photo (photoName, caption, idUser, location)
            VALUES (?, ?, ?, ?)`,
            [photoName, caption, req.userAuth.id, location]
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
