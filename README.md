# ########## Proyecto HackaBoss Backend ##########

# ########## API Instagrom ##########

-   Esta API es un clon de Instagram que permite publicar fotos (añadiendo o no textos) y que otras
    personas puedan verlas.

Para la ejecución de este proyecto seguimos los siguientes pasos:

-   Crear una base de datos vacía en una instancia MySQL en local.

_CREATE DATABASE IF NOT EXISTS instagrom;_

-   Copiar el archivo .env.example como .env y rellenar las variables de entorno con sus datos necesarios.

-   Ejecutar npm i para instalar todas las dependencias necesarias.

-   El comando npm run db ejecutará la creación de las tablas e inserción de algunos datos de ejemplo.

-   Ejecutar el comando npm run dev para poner a la escucha al servidor.

-   Importar la colección PostmanCollection.json a la aplicación de Postman con todos los endpoints creados.

# ######### Usuarios anónimos

- Ver las últimas fotos publicadas por otros usuarios ✅
- Ver el perfil de un usuario con su galería de fotos ✅
- Buscar fotos (por su texto descriptivo) ✅
- Login ✅
- Registro ✅

# ######### Usuarios registrados

- Hacer una publicación de una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma), y añadirle una descripción ✅
- Hacer/Quitar un “like” a una foto ✅

# ######### Opcional:

Gestión del perfil (cambios en los datos de registro)
Comentar una foto (no se permiten comentarios a comentarios)
