Proyecto HackaBoss Backend

API Instagrom

Esta API es un clon de Instagram que permite publicar fotos (añadiendo o no textos) y que otras
personas puedan verlas.

Para la ejecución de este proyecto seguimos los siguientes pasos:

Crear una base de datos vacía en una instancia MySQL en local.

CREATE DATABASE IF NOT EXISTS instagrom;

Copiar el archivo .env.example como .env y rellenar las variables de entorno con sus datos necesarios.

Crear la carpeta static en la raiz del proyecto con las subcarpetas static/avatar y static/product.

Ejecutar npm i para instalar todas las dependencias necesarias.

El comando npm run db ejecutará la creación de las tablas e inserción de algunos datos de ejemplo.

Ejecutar el comando npm run dev para poner a la escucha al servidor.

Importar la colección PostmanCollection.json a la aplicación de Postman con todos los endpoints creados.

Usuarios anónimos

Ver las últimas fotos publicadas por otros usuarios
Ver el perfil de un usuario con su galería de fotos
Buscar fotos (por su texto descriptivo)
Login
Registro

Usuarios registrados

Hacer una publicación de una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma), y añadirle una descripción
Hacer/Quitar un “like” a una foto

Opcional:

Gestión del perfil (cambios en los datos de registro)
Comentar una foto (no se permiten comentarios a comentarios)

Endpoints ✅

Usuarios ✅

POST[/register] - Registra un nuevo usuario.

POST[/login] - Login de usuario. (devuelve un token).

GET[/users/:idUser] - Devuelve información de un usuario.

PUT[/users] - Modifica username e email. TOKEN.

PUT[/users/personal-data] - Modifica el nombre, apellidos y direccion del usuario. TOKEN.

PUT[/users/password] - Modifica la contraseña del usuario. TOKEN.

PUT[/users/avatar] - Modifica el avatar del usuario. TOKEN.

DELETE[/users] - Elimina un usuario. TOKEN.

Productos ✅

POST[/products/new] - Inserta un nuevo producto. TOKEN.

POST[/products/:idProduct/photo] - Añade una nueva foto de producto. TOKEN.

GET[/products] - Lista todos los productos.

PUT[/products/:idProduct] - Edita datos de un producto del usuario. TOKEN.

PUT[/products/:idProduct/sold] - Marca un producto como vendido por el propietario. TOKEN.

DELETE[/products/:idProduct] - Elimina un producto. TOKEN.

Likes ✅

POST[/products/:idProduct/like] - Añade un producto a favoritos. TOKEN.

GET[/products/like] - Lista todos los productos marcados como favoritos. TOKEN.

DELETE[/products/:idProduct/like] - Elimina un producto de favoritos. TOKEN.
