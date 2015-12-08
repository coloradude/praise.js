var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/all_in_favor';
var Promise = require('promise')

module.exports = {
  insert: function(table, obj){
    var columns = Object.getOwnPropertyNames(obj),
        values = [],
        variables = [];
    for (var prop in obj){
      values.push(obj[prop]);
    }
    var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ')' + 'values(';
    values.forEach(function(_, i){
      variables.push('$' + (i + 1));
    })
    query += variables.join(', ') + ') RETURNING *;';
    send(query);
  },

  selectAll: function(table){
    var query = 'SELECT * FROM ' + table;
    send(query);
  },

  selectById: function(table, id){
    var query = 'SELECT DISTINCT * from ' + table + ' where id = ' + id
    send(query);
  },

  select: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'SELECT * from ' + table + ' where ' + column[0] + ' = ' + "'" + data[column] + "';"
    send(query);
  },

  selectOne: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'SELECT DISTINCT * from ' + table + ' where ' + column[0] + ' = ' + "'" + data[column] + "';"
    send(query);
  },

  selectDistinct: function(table, column){
    var query = 'SELECT DISTINCT ' + column + ' from ' + table + ';'
    send(query);
  },

  delete: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'DELETE FROM ' + table + ' WHERE ' + column[0] + ' = ' + "'" + data[column] + "' RETURNING *;"
    send(query);
  },

  deleteOne: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'DELETE FROM ' + table + ' WHERE ' + column[0] + ' = ' + "'" + data[column] + "' RETURNING *;"
    send(query);
  },

  deleteAll: function(table){
    var query = 'DELETE FROM ' + table + ';'
    send(query)
  },

  update: function(table, search, set){
    var searchColumn = Object.getOwnPropertyNames(search)[0]
    var searchValue = search[searchColumn]
    var setCol = Object.getOwnPropertyNames(set)[0]
    var setVal = set[setCol]
    var query = 'UPDATE ' + table + ' SET ' + setCol + " = '" + setVal + "' WHERE " + searchColumn + " = '"  + searchValue + "' RETURNING *;"
    send(query);
  },

  join: function(t1, t2, id){
    var query = 'SELECT * FROM ' + t2 + ' NATURAL JOIN ' + t1 + ' WHERE options.poll_id = ' + id + ';'
    send(query);
  }
}

function send(query){
  return new Promise(function(resolve, reject){
    pg.connect(connectionString, function(err, client, done){
      client.query(query, function(err, result){
        done()
        if (err) reject(err)
        else resolve(result.rows[0])
      })
    })
  })
}
