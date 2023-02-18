const getDB = require('../../db/getDB');
const { savePhoto } = require('../../helpers');

const addPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { caption } = req.body;

        const photoName = await savePhoto(req.files.photo);

        console.log('foto guardada', photoName);

        // await connection.query(
        //     `INSERT INTO photo (photoName, caption, idUser)
        //     VALUES (?, ?, ?)`,
        //     [photoName, caption, req.userAuth.id]
        // );
        await connection.query(
            `INSERT INTO photo (photoName, caption, idUser)
            VALUES (?, ?, ?)`,
            [photoName, caption, 1]
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
