const getDB = require('../../db/getDB');
const { deletePostFile } = require('../../helpers');

const deletePost = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { id } = req.params;

        const [posts] = await connection.query(
            `SELECT postName FROM post WHERE id = ?`,
            [id]
        );

        for (let i = 0; i < posts.length; i++) {
            await deletePost(posts[i].name, './photos');
        }

        await connection.query(`DELETE FROM post WHERE id = ?`, [id]);

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

module.exports = deletePost;
