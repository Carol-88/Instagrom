
const sharp = require('sharp');
const uuid = require('uuid');

const photoDir = path.join(__dirname, 'static', 'photos');

// Funcion que guarda una nueva foto en el servidor y devuelve un nombre único para la imagen
async function savePhoto(imagen, type) {
    try {
        // Convertimos la imagen recibida en un objeto sharp
        const sharpImage = sharp(imagen.data);

        // Variable que guarda la ruta absoluta al directorio de avatar o producto, dependiendo del tipo
        let photoPath;

        // Generamos un nombre único para la imagen
        const imageName = uuid.v4() + '.jpg';
       
            // Como es una imagen para perfil, redimensionamos la imagen
            sharpImage.resize(640, 640);
         if (photo) {
            photoPath = path.join(photoDir, imageName);
        }

        // Guardamos la imagen
        sharpImage.toFile(photoPath);

        // Devolvemos el nombre de imagen generado
        return imageName;
    } catch (error) {
        throw new Error('¡Ha ocurrido un error al procesar la imagen!');
    }
}

module.exports = savePhoto;