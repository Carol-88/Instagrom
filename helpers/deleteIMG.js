const { unlink } = require('fs/promises');

async function deletePhoto(photoName, photo) {
    try {
        let photoPath;
        if (photo === 0) {
            photoPath = path.join(avatarDir, photoName);
        }
        await unlink(photoPath);
    } catch (error) {
        throw new Error('¡Error al procesar la imagen del servidor!');
    }
}

module.exports = deletePhoto;
