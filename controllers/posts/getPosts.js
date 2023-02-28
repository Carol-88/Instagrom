const getDB = require('../../db/getDB');

const getPosts = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { caption, startDate, endDate } = req.query;

        let mySQLQuery =
            'SELECT post.*, count(user_like_post.id) AS likes FROM post LEFT JOIN user_like_post on post.id=user_like_post.idPost GROUP BY post.id';
        const values = [];
        let clause = 'WHERE';

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

        const [posts] = await connection.query(mySQLQuery, values);

        res.send({
            status: 'Ok',
            data: posts,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getPosts;
