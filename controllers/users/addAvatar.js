const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const savePhoto = require('../../helpers/saveAvatar');

const addAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        if (!req.files?.avatar)
            throw generateError('Hay que subir un avatar', 500);

        const avatarName = await savePhoto(req.files.avatar);

        await connection.query(`UPDATE user SET avatar = ? WHERE user.id = ?`, [
            avatarName,
            req.userAuth.id,
        ]);

        res.send({
            status: 'Ok',
            message: 'Avatar subido con éxito!',
            data: { avatarName },
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
