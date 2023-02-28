const { unlink } = require('fs/promises');

async function deletePostFile(postName) {
    try {
        const postPath = path.join(__dirname, '../photos', postName);

        await unlink(postPath);
    } catch (error) {
        throw new Error('¡Error al procesar la imagen del servidor!');
    }
}

module.exports = deletePostFile;
