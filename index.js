const server = require('./aplikasi/server')
const config = require('./config')
const Logger = require('./helper/utils/logger')

const { name, port, host } = config.server
const logger = new Logger()

server.listen(port, host, () => {
  logger.log('server::listen', `${name} server listening on ${host}:${port}`, 'initiate application')
})