const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const addPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { photoName, id, caption, idUser } = req.body;

        // const photoName = await savePhoto(req.files.photo, savePhoto);

        await connection.query(
            `INSERT INTO photo (photoName, id, caption, idUser)
            VALUES (?, ?, ?, ?)`,
            [photoName, id, caption, idUser]
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
