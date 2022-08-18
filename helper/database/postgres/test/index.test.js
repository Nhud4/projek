const { assert, expect } = require('chai')
const Postgres = require('../index')

describe('bin/helper/database/postgres/index.js', () => {
  describe('class Postgres', () => {
    const postgres = new Postgres({ connectionString: 'db-1' })
    describe('.query', () => {
      it('should success query', async () => {
        const result = await postgres.query('', '')
        expect(result).to.be.an.instanceOf(Object)
      })
    })
  })
})