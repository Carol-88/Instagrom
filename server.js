const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");

// Creamos el servidor
const app = express();

// Middleware para cors
app.use(cors());

// Deserializamos el body en formato raw
app.use(express.json());

// Middleware de Morgan para obtener más información sobre cada una de las peticiones
app.use(morgan("dev"));

// Middleware para leer el body en formato form-data (para leer archivos e imágenes)
// instalación -> npm i express-fileupload
app.use(fileUpload());

/* 
    ###################
    ### Middlewares ###
    ###################
*/

/* 
    #################################
    ### Controladores de Usuarios ###
    #################################
*/

/* 
    ##########################
    ### Endpoints Usuarios ###
    ##########################
*/

/* 
    ########################################
    ### Middlewares de Error y Not Found ###
    ########################################
*/

// Middleware de Error
app.use((error, req, res, _) => {
	console.error(error);

	// Establecemos el codigo del error
	res.status(error.httpStatus || 500);

	// Respondemos
	res.send({
		status: "Error",
		message: error.message,
	});
});

// Middleware de Not Found
app.use((req, res) => {
	// Establecemos el codigo de error 404
	res.status(404);

	// Respondemos
	res.send({
		status: "Error",
		message: "Not found",
	});
});

// Ponemos el servidor a la escucha
app.listen(process.env.PORT, () => {
	console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
