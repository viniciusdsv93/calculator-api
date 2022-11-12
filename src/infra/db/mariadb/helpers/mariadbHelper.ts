import { createPool } from "mariadb";

const pool = createPool({
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	password: "password",
	database: "calculator-mariadb",
	connectionLimit: 5,
});

pool.getConnection()
	.then((conn) => {
		conn.query(
			"CREATE OR REPLACE TABLE math_results (id VARCHAR(255), mathExpression VARCHAR(255) NOT NULL, result DECIMAL NOT NULL, date VARCHAR(255) NOT NULL)"
		);
	})
	.catch((err) => {
		console.log("Error when trying to connect: ", err);
	});

export { pool };
