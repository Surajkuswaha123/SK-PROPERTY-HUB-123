require("dotenv").config();

const pool = require("./db/database");

async function testDB() {

    try {

        const result = await pool.query(
            "SELECT NOW()"
        );

        console.log(
            "Database Connected Successfully"
        );

        console.log(result.rows[0]);

    } catch (error) {

        console.log(error);

    }

}

testDB();