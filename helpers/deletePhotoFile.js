const { unlink } = require('fs/promises');

async function deletePhotoFile(photoName) {
    try {
        const photoPath = path.join(__dirname, '../photos', photoName);

        await unlink(photoPath);
    } catch (error) {
        throw new Error('¡Error al procesar la imagen del servidor!');
    }
}

module.exports = deletePhotoFile;
