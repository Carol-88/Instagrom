const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

const photosDir = path.join(__dirname, '..', 'static', 'photos');

async function savePhoto(imagen) {
    try {
        const sharpImage = sharp(imagen.data);

        const photoName = uuid.v4() + '.jpg';

        sharpImage.resize(1080, 1350);

        const photoPath = path.join(photosDir, photoName);

        sharpImage.toFile(photoPath);

        return photoName;
    } catch (error) {
        throw new Error('¡Ha ocurrido un error al procesar la imagen!');
    }
}

module.exports = savePhoto;
