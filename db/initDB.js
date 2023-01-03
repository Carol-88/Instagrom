const getDB = require(`./getDB`);

async function main() {
  let connection;

  try {
    connection = await getDB();

    console.log("Eliminando tablas en caso de que existan...");

    await connection.query(`DROP TABLE IF EXISTS user_like_photo`);
    await connection.query(`DROP TABLE IF EXISTS photo`);
    await connection.query(`DROP TABLE IF EXISTS user`);

    console.log("¡Tablas eliminadas!");

    console.log("Creando tablas...");

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
            birthday DATE,
            address VARCHAR(200) 
        )`
    );

    await connection.query(
      `CREATE TABLE IF NOT EXISTS photo (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            location VARCHAR(100),
            caption VARCHAR(500),
            idUser INT UNSIGNED NOT NULL,
            FOREIGN KEY (idUser) REFERENCES user(id)
        )`
    );

    await connection.query(
      `CREATE TABLE IF NOT EXISTS user_like_photo(
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idUser INT UNSIGNED NOT NULL,
            idPhoto INT UNSIGNED NOT NULL,
            addDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (idUser) REFERENCES user (id),
            FOREIGN KEY (idPhoto) REFERENCES photo (id)
        )`
    );

    console.log("¡Tablas creadas!");

    console.log("Insertando datos de prueba...");

    await connection.query(
      `INSERT INTO user (username, email, password)
         VALUES ('userPrueba', 'prueba@gmail.com', '123')`
    );

    await connection.query(
      `INSERT INTO photo(location, caption, idUser)
        VALUES ('Madrid', 'Celebrando Año Nuevo', 1),
        ('Vigo', 'Viendo las luces', 1),
        ('Alicante', 'Por aquí de vuelta', 1)`
    );

    console.log("¡Datos de prueba insertados con éxito!");
  } catch (error) {
    console.error(error.message);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
