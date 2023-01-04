const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const validateUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { registrationCode } = req.params;

        const [user] = await connection.query(
            `SELECT * FROM user WHERE registrationCode = ?`,
            [registrationCode]
        );

        if (user.length < 1 || user[0].active === 1) {
            throw generateError('¡El usuario ya está activado!', 409);
        }

        await connection.query(
            `UPDATE user SET registrationCode = null, active = 1 WHERE registrationCode = ?`,
            [registrationCode]
        );

        res.send({
            status: 'Ok',
            message: '¡Usuario activado!',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = validateUser;
