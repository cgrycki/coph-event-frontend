// Libraries
var mysql = require('mysql');

// Helper Functions
function connect_to_mysql(host, user, password, database) {
  /*
   * @method
   * @description Function that creates a specified connection to a MySql database.
   * @param {string} host - Host to use for MySql.
   * @param {string} user - Username for MySql.
   * @param {string} password - Password for MySql.
   * @param {string} database - Database name to connect to.
   * @returns {mysql.Connection} - Connection to specified MySql instance.
   */
  var mysql_conn = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database === undefined ? undefined:database
  });

  return mysql_conn;
}

function create_mysql_table(db, schema) {
  /*
   * @description Connects to a MySql Database, and creates a table from given schema.
   * @param {string} db - Database name formatted as string.
   * @param {string} scheme - Table schema as string
   * @returns {null} Does not return anything.
   */
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: db
  });

  // Now connect to MySql and update user
  con.connect(function(err) {
    if (err) console.log(err);
    console.log("Connected to the " + db + " database!");

    // Insert table
    con.query(TABLE_SCHEMA, function (err, result) {
      if (err) console.log(err);
      console.log("\tTable created!");

      // End our connection so we can create another if we want
      con.end();
    });
  });
}

// Local Variables used in script
var local_host = 'localhost',
    local_user = 'root',
    local_pass = 'password',
    local_db   = 'DemoCophEvents';

var TABLE_SCHEMA = "CREATE TABLE `Events` (\
  `EventID` int NOT NULL AUTO_INCREMENT,\
  `UserEmail` varchar(255) NOT NULL,\
  `UserName` varchar(255) NOT NULL,\
  `EventName` varchar(255) NOT NULL,\
  `EventDate` DATE NOT NULL,\
  `EventTime` TIME NOT NULL,\
  `EventComments` TEXT,\
  `NumPeople` int NOT NULL DEFAULT '0',\
  `NumChairsPerTable` int NOT NULL DEFAULT '6',\
  `NumRoundTables` int NOT NULL DEFAULT '0',\
  `NumRectTables` int NOT NULL DEFAULT '0',\
  `NumPosterBoards` int NOT NULL DEFAULT '0',\
  `NumTrashCans` int NOT NULL DEFAULT '0',\
  `LayountPNG` tinyblob,\
  PRIMARY KEY (`EventID`))";

var DATABASES = ['DemoCophEvents', 'LiveCophEvents'];


// Connect to MySql
var conn = connect_to_mysql(local_host, local_user, local_pass);

// Create the testing and production databases
conn.connect(function(err) {
  if (err) throw err; console.log("Connected to MySql!\n\nCreating databases...");

  conn.query("CREATE DATABASE IF NOT EXISTS DemoCophEvents", function (err, result) {
    if (err) throw err; console.log("\tDEMO Database created");
  });

  conn.query("CREATE DATABASE IF NOT EXISTS LiveCophEvents", function (err, result) {
    if (err) throw err; console.log("\tLIVE Database created");
    conn.end(); // Close out our connection
  });
});

// Create tables in each database
DATABASES.forEach(db => create_mysql_table(db, TABLE_SCHEMA));
