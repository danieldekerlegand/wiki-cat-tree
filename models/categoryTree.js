var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

console.log('test');

var categoryTree = function(category) {
  console.log("dbConfig",dbConfig);

  oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Connection was successful!');

    connection.close(
      function(err)
      {
        if (err) {
          console.error(err.message);
          return;
        }
      });
  });
};

module.exports = {
  categoryTree: function() {
    console.log(foo);
  }
};

// module.exports = function(category) {
//   // Get a non-pooled connection
//   oracledb.getConnection(
//     {
//       user          : dbConfig.user,
//       password      : dbConfig.password,
//       connectString : dbConfig.connectString
//     },
//     function(err, connection)
//     {
//       if (err) {
//         console.error(err.message);
//         return;
//       }
//       connection.execute(
//         // The statement to execute
//         "WITH tree_rows AS (" +
//         "SELECT page_id AS parent_id, cl_from AS child_id, page_title AS parent_cat_title, type" +
//         "FROM page INNER JOIN categorylinks ON page_title = cl_to" +
//         "START WITH page_title = :category" +
//         "CONNECT BY NOCYCLE page_id = PRIOR cl_from" +
//         ")" +
//
//         "SELECT DISTINCT parent_id, child_id, parent_cat_title, page.page_title AS child_page_title" +
//         "FROM tree_rows OUTER JOIN page ON child_id = page.page_id;" +
//
//         // The "bind value" 180 for the "bind variable" :id
//         [category],
//
//         // Optional execute options argument, such as the query result format
//         // or whether to get extra metadata
//         // { outFormat: oracledb.OBJECT, extendedMetaData: true },
//
//         // The callback function handles the SQL execution results
//         function(err, result)
//         {
//           if (err) {
//             console.error(err.message);
//             doRelease(connection);
//             return;
//           }
//           console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
//           console.log(result.rows);     // [ [ 180, 'Construction' ] ]
//           doRelease(connection);
//         });
//     });
//
//   // Note: connections should always be released when not needed
//   function doRelease(connection)
//   {
//     connection.close(
//       function(err) {
//         if (err) {
//           console.error(err.message);
//         }
//       });
//   }
// };
