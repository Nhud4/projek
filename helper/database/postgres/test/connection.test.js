const Connection = require('../connection')
const { Pool } = require('pg')
const sinon = require('sinon')
const { assert, expect } = require('chai')

describe('bin/helper/database/postgres/connection.js', () => {
  describe('.createConnection', () => {
    it('should create connection', async () => {
      const config = { connectionString: 'db-1' }
      const result = await Connection.createConnection(config)
      expect(result).to.be.an.instanceOf(Pool)
    })
  })
  describe('.getConnection', () => {
    it('should get connection', async () => {
      const config = { connectionString: 'db-1' }
      const result = await Connection.getConnection(config)
      assert.deepEqual(result, null)
    })
  })
})