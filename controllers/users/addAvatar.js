const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const savePhoto = require('../../helpers/saveAvatar');

const addAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { avatar } = req.body;

        if (!req.files?.avatar)
            throw generateError('Hay que subir un avatar', 500);

        const avatarName = await savePhoto(req.files.photo);

        await connection.query(
            `INSERT INTO user (avatarName, avatar, id)
            VALUES (?, ?, ?)`,
            [avatarName, avatar, req.userAuth.id]
        );

        res.send({
            status: 'Ok',
            message: 'Avatar subido con éxito!',
        });
        if (!req.files?.avatar) {
            throw generateError('¡Debes subir un avatar!', 400);
        }
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addAvatar;
