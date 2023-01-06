const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const cors = require('cors');

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
const newUser = require('./controllers/users/newUser');
const loginUser = require('./controllers/users/login');
const validateUser = require('./controllers/users/validateUser');

/* 
    ##########################
    ### Endpoints Usuarios ###
    ##########################
*/

app.post('/register', newUser);
app.post('/login', loginUser);
app.post('/validate/:registrationCode', validateUser);

/* 
    ##################################
    ##### Controladores de fotos #####
    ##################################
*/

const addPhoto = require('./controllers/posts/addPhoto');
const deletePhoto = require('./controllers/posts/deletePhoto');
const photoByUser = require('./controllers/posts/photoByUser');
const photoByCaption = require('./controllers/posts/photoByCaption');
const photoByDate = require('./controllers/posts/photoByDate');

/* 
    ##############################
    ##### Endpoints de fotos #####
    ##############################
*/

app.post('/addPhoto', addPhoto);
app.put('/deletePhoto', isAuth, deletePhoto);
app.post('/foundPhoto', photoByUser);
app.post('/foundCaption', photoByCaption);
app.post('/foundDate', photoByDate);

/* 
    ##############################
    ### Controladores de likes ###
    ##############################
*/

/* 
    ##########################
    ### Endpoints de likes ###
    ##########################
*/

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

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
