const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

const photosDir = path.join(__dirname, '..', 'static', 'avatar');

async function savePhoto(imagen) {
    try {
        const sharpImage = sharp(imagen.data);
        console.log(imagen.data);

        const avatarName = uuid.v4() + '.jpg';

        sharpImage.resize(70, 70);

        const photoPath = path.join(photosDir, avatarName);

        sharpImage.toFile(photoPath);

        return avatarName;
    } catch (error) {
        throw new Error('¡Ha ocurrido un error al procesar el avatar!');
    }
}

module.exports = savePhoto;
