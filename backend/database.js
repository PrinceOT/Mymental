const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: "postgresql://mypostgres_5gtw_user:VYokwcuiBimzS1IrxsO1L8mOSzdr9Z40@dpg-cqdgtchu0jms738pagv0-a.frankfurt-postgres.render.com/mypostgres_5gtw",
    user:"mypostgres_5gtw_user",
    password: "VYokwcuiBimzS1IrxsO1L8mOSzdr9Z40",
    host: "dpg-cqdgtchu0jms738pagv0-a.frankfurt-postgres.render.com",
    port: 5432,
    database:"mypostgres_5gtw",
    ssl:true,
});



module.exports = pool;