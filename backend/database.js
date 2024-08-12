const Pool = require("pg").Pool;

const pool = new Pool({
   
    connectionString:'postgresql://postgres.cufotyfczmpyugiuetvw:lnAWdfOMpJtQ3Tm8@aws-0-eu-west-2.pooler.supabase.com:6543/postgres'
   
});



module.exports = pool;