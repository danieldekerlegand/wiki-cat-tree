var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

module.exports = function() {
  // Get a non-pooled connection
  oracledb.getConnection(
    {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    },
    function(err, connection)
    {
      if (err) {
        console.log('There was an error connecting to Oracle db.');
        console.error(err.message);
        return;
      }
      connection.execute(
        // The statement to execute
        "SELECT department_id, department_name " +
          "FROM departments " +
          "WHERE department_id = :id",

        // The "bind value" 180 for the "bind variable" :id
        [180],

        // Optional execute options argument, such as the query result format
        // or whether to get extra metadata
        // { outFormat: oracledb.OBJECT, extendedMetaData: true },

        // The callback function handles the SQL execution results
        function(err, result)
        {
          if (err) {
            console.error(err.message);
            doRelease(connection);
            return;
          }
          console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
          console.log(result.rows);     // [ [ 180, 'Construction' ] ]
          doRelease(connection);
        });
    });
};

// Note: connections should always be released when not needed
function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
