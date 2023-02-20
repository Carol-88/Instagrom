const getDB = require('../../db/getDB');

const getPhotos = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { caption, startDate, endDate } = req.query;

        // let mySQLQuery =
        //     'SELECT photo.*, count(user_like_photo.id) AS likes FROM photo LEFT JOIN user_like_photo on photo.id=user_like_photo.idPhoto GROUP BY photo.id';
        // const values = [];
        // let clause = 'WHERE';

        if (caption) {
            mySQLQuery += ` ${clause} caption LIKE ?`;
            values.push(`%${caption}%`);
            clause = 'AND';
        }

        if (startDate) {
            mySQLQuery += ` ${clause} publication_date > ?`;
            values.push(startDate);
            clause = 'AND';
        }

        if (endDate) {
            mySQLQuery += ` ${clause} publication_date < ?`;
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
