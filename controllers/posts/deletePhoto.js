const getDB = require('../../db/getDB');
const { deletePhotoFile } = require('../../helpers');

const deletePhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idPhoto } = req.params;

        const [photos] = await connection.query(
            `SELECT photoName FROM photo WHERE idPhoto = ?`,
            [idPhoto]
        );

        for (let i = 0; i < photos.length; i++) {
            await deletePhoto(photos[i].name, './photos');
        }

        await connection.query(`DELETE FROM photo WHERE idPhoto = ?`, [
            idPhoto,
        ]);

        res.send({
            status: 'Ok',
            message: '¡Foto eliminada con éxito!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deletePhoto;
