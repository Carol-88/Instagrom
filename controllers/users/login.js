const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginUser = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { email, password } = req.body;

        if (!email || !password) {
            throw generateError(`¡Faltan campos obligatorios!, 400`);
        }

        // No hace el SELECT

        const [user] = await connection.query(
            `SELECT * FROM user WHERE email = ?`,
            [email]
        );

        let validPassword;
        if (user.length > 0) {
            validPassword = await bcrypt.compare(password, user[0].password);
        }

        if (user.length < 1 || !validPassword) {
            throw generateError(`¡Email o contraseña incorrectos!`, 401);
        }

        if (user[0].active !== 1) {
            throw generateError(
                `¡Usuario no activado, comprueba tu correo para activarlo!`,
                403
            );
        }

        const tokenInfo = {
            id: user[0].id,
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: `2d`,
        });

        res.send({
            status: `Ok`,
            message: `¡Sesión iniciada correctamente!`,
            authToken: token,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = loginUser;
