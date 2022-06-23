const mysql = require('mysql2')

const main = async () => {
  
  const pool = mysql.createPool({host: 'localhost', port: 3306, user: 'local', password: 'secret', database:'yakes-telkom'})

  const promisePool = pool.promise()

  const [rows, fields] = await promisePool.query('SELECT ?', ['Hello World!'])
  console.log(rows)
  console.log(fields)
  return rows
}

main()
