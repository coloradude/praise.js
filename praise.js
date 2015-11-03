var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/weresquirrels';
var Promise = require('promise')

module.exports = {
  insert: function(table, obj){
    var columns = Object.getOwnPropertyNames(obj),
        values = [],
        variables = []
    for (var prop in obj){
      values.push(obj[prop])
    }
    var query = 'INSERT INTO ' + table + '(' + columns.join(', ') + ')' + 'values(';
    values.forEach(function(_, i){
      variables.push('$' + (i + 1))
    })
    query += variables.join(', ') + ') RETURNING ID'
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, values, function(err, result){
          obj.id = result.rows[0].id
          done();
          if (err) reject(err)
          else resolve(obj)
        })
      })
    })
  },

  selectAll: function(table, cb){
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query('SELECT * FROM ' + table, function(err, result){
          done();
          if (err) reject(err) 
          else resolve(result.rows) 
        });
      })
    })
  },

  selectById: function(table, id){
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query('SELECT DISTINCT from ' + table + ' where id = ' + id, function(err, result){
          done();
          if (err) reject(err)
          else resolve(result.rows[0])
        })
      })
    })
  },

  selectOne: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'SELECT DISTINCT from ' + table + ' where ' + column[0] + ' = ' + data[column]
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done();
          if (err) reject(err)
          else resolve(result.rows[0])
        })
      })
    })
  },

  delete: function(table, data){
    var column = Object.getOwnPropertyNames(data)
    var query = 'DELETE FROM ' + table + ' WHERE ' + column[0] + ' = ' data[column] + ';'
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done()
          if (err) reject(err)
          else resolve(result)
        })
      })
    })
  },

  update: function(table, search, set){
    var sCol = Object.getOwnPropertyNames(search)[0]
    var sVal = search[sCol]
    var setCol = Object.getOwnPropertyNames(search)[0]
    var setVal = serach[setCol]
    var query = 'UPDATE ' + table + ' SET ' + setCol + ' = ' + setVal + ' WHERE ' + sCol + ' = ' + sVal + ';'
    return new Promise(function(resolve, reject){
      pg.connect(connectionString, function(err, client, done){
        client.query(query, function(err, result){
          done()
          if (err) reject(err)
          else resolve(result)
        })
      })
    })
  }
}