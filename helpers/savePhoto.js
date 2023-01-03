const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

const photoDir = path.join(__dirname, 'photos');

async function savePhoto(imagen) {
    try {
        const sharpImage = sharp(imagen.data);

        let photoPath;

        const imageName = uuid.v4() + '.jpg';

        sharpImage.resize(1080, 1350);
        if (photo) {
            photoPath = path.join(photoDir, imageName);
        }

        sharpImage.toFile(photoPath);

        return imageName;
    } catch (error) {
        throw new Error('¡Ha ocurrido un error al procesar la imagen!');
    }
}

module.exports = savePhoto;
