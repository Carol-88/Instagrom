const getDB = require('../../db/getDB');
const { savePost, generateError } = require('../../helpers');

const addPost = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { caption } = req.body;
        if (!req.files.post) generateError('Hay que subir una foto', 500);

        const postName = await savePost(req.files.post);

        await connection.query(
            `INSERT INTO post (postName, caption, idUser)
            VALUES (?, ?, ?)`,
            [postName, caption, req.userAuth.id]
        );

        res.send({
            status: 'Ok',
            message: '¡Foto subida con éxito!',
        });
        if (!req.files?.post) {
            throw generateError('¡Debes subir una foto!', 400);
        }
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addPost;
