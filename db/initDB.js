const getDB = require('./getDB');

async function main() {
    let connection;

    try {
        connection = await getDB();

        console.log('Eliminando tablas en caso de que existan...');

        await connection.query(`DROP TABLE IF EXISTS user_comment_post`);
        await connection.query(`DROP TABLE IF EXISTS user_like_post`);
        await connection.query(`DROP TABLE IF EXISTS post`);
        await connection.query(`DROP TABLE IF EXISTS user`);

        console.log('¡Tablas eliminadas!');

        console.log('Creando tablas...');

        await connection.query(
            `CREATE TABLE IF NOT EXISTS user (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(100) NOT NULL,
            name VARCHAR(50),
            lastname VARCHAR(100),
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            avatar VARCHAR(255),
            registrationCode VARCHAR(250),
            active TINYINT DEFAULT 0,
            birthday DATE
        )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS post (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            postName VARCHAR(500),
            location VARCHAR(100),
            caption VARCHAR(500),
            publication_date TIMESTAMP NOT NULL DEFAULT NOW(),
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser) REFERENCES user(id)
        )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS user_like_post(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idUser INT UNSIGNED NOT NULL,
            idPost INT UNSIGNED NOT NULL,
            addDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES user (id),
            FOREIGN KEY (idPost) REFERENCES post (id)
        )`
        );

        await connection.query(
            `CREATE TABLE IF NOT EXISTS user_comment_post(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idUser INT UNSIGNED NOT NULL,
            idPost INT UNSIGNED NOT NULL,
            addDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES user (id),
            FOREIGN KEY (idPost) REFERENCES post (id)
        )`
        );

        console.log('¡Tablas creadas!');
    } catch (error) {
        console.error(error.message);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
