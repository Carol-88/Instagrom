const getDB = require('../../db/getDB');
const jwt = require('jsonwebtoken');

const getPhotos = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { authorization } = req.headers;

        let tokenInfo;

        if (authorization) {
            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        }

        const { caption, startDate, endDate } = req.query;

        let mySQLQuery =
            'SELECT p.*, count(l.id) AS likes, IF(MAX(l2.idUser) IS NULL, FALSE, TRUE) likedByLogguedUser FROM photo p LEFT JOIN user_like_photo l on p.id=l.idPhoto LEFT JOIN user_like_photo l2 on (p.id=l2.idPhoto AND l2.idUser = ?) GROUP BY p.id';
        const values = [tokenInfo?.id];
        let clause = 'WHERE';

        if (caption) {
            mySQLQuery += ` ${clause} p.caption LIKE ?`;
            values.push(`%${caption}%`);
            clause = 'AND';
        }

        if (startDate) {
            mySQLQuery += ` ${clause} p.publication_date > ?`;
            values.push(startDate);
            clause = 'AND';
        }

        if (endDate) {
            mySQLQuery += ` ${clause} p.publication_date < ?`;
            values.push(`${endDate} 23:59:59`);
        }

        const [photos] = await connection.query(mySQLQuery, values);

        res.send({
            status: 'Ok',
            data: photos,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getPhotos;
