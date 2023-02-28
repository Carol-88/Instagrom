const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

// Creamos el servidor
const app = express();

// Middleware para cors
app.use(cors());

// Deserializamos el body en formato raw
app.use(express.json());

// Middleware de Morgan para obtener más información sobre cada una de las peticiones
app.use(morgan('dev'));

// Middleware para leer el body en formato form-data (para leer archivos e imágenes)
// instalación -> npm i express-fileupload
app.use(fileUpload());

app.use('/photos', express.static('./static/photos'));

/* 
    ###################
    ### Middlewares ###
    ###################
*/

const isAuth = require('./middlewares/isAuth');

/* 
    #################################
    ### Controladores de Usuarios ###
    #################################
*/
const register = require('./controllers/users/register');
const validateUser = require('./controllers/users/validateUser');
const loginUser = require('./controllers/users/login');
const getProfile = require('./controllers/users/getProfile');
const getMyProfile = require('./controllers/users/getMyProfile');

/* 
    ##########################
    ### Endpoints Usuarios ###
    ##########################
*/

app.post('/register', register);
app.get('/validate/:registrationCode', validateUser);
app.post('/login', loginUser);
app.get('/profile/idUser', getProfile);
app.get('/profile/', isAuth, getMyProfile);

/* 
    ##################################
    ##### Controladores de fotos #####
    ##################################
*/

const addPost = require('./controllers/posts/addPost');
const deletePost = require('./controllers/posts/deletePost');
const getPosts = require('./controllers/posts/getPosts');

/* 
    ##############################
    ##### Endpoints de fotos #####
    ##############################
*/

app.post('/addPost', isAuth, addPost);
app.delete('/deletePost/:idPost', isAuth, deletePost);
app.get('/posts', getPosts);

/* 
    ##############################
    ### Controladores de likes ###
    ##############################
*/

const addFavPost = require('./controllers/favs/addFav');
const deleteFavPost = require('./controllers/favs/deleteFav');

/* 
    ##########################
    ### Endpoints de likes ###
    ##########################
*/

app.post('/favs/:idPost/like', isAuth, addFavPost);
app.delete('/favs/:idPost/unlike', isAuth, deleteFavPost);

/* 
    ####################################
    ### Controladores de comentarios ###
    ####################################
*/

const addComment = require('./controllers/posts/addComment');
const deleteComment = require('./controllers/posts/deleteComment');

/* 
    ################################
    ### Endpoints de comentarios ###
    ################################
*/

app.post('/posts/:idPost/comment', isAuth, addComment);
app.delete('/posts/:idPost/uncomment', isAuth, deleteComment);

// Middleware de Error
app.use((error, req, res, _) => {
    console.error(error);

    res.status(error.httpStatus || 500);

    res.send({
        status: 'Error',
        message: error.message,
    });
});

// Middleware de Not Found
app.use((req, res) => {
    res.status(404);

    res.send({
        status: 'Error',
        message: 'Not found',
    });
});

// app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
