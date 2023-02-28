const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');

const postsDir = path.join(__dirname, '..', 'static', 'photos');

async function savePost(imagen) {
    try {
        const sharpImage = sharp(imagen.data);

        const postName = uuid.v4() + '.jpg';

        sharpImage.resize(1080, 1350);

        const postPath = path.join(postsDir, postName);

        sharpImage.toFile(postPath);

        return postName;
    } catch (error) {
        throw new Error('¡Ha ocurrido un error al procesar la imagen!');
    }
}

module.exports = savePost;
