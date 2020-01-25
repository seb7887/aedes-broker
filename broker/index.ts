import { Server, Client, AuthenticateError } from 'aedes'
import persistence from 'aedes-persistence'
import logging from 'aedes-logging'
import net from 'net'

const broker = Server({
  persistence: persistence(),
  authenticate: (
    client: Client,
    username: string,
    password: string,
    callback
  ) => {
    if (username === 'test' && password.toString() === 'test') {
      callback(null, true)
    } else {
      const error = new Error() as AuthenticateError
      error.returnCode = 4

      callback(error, false)
    }
  }
})
const server = net.createServer(broker.handle)

logging({
  instance: broker,
  servers: [server]
})

broker.on('client', client => {
  console.log(`Broker -> Client ${client.id} connected`)
})

broker.on('clientDisconnect', client => {
  console.log(`Broker -> Client ${client.id} disconnected`)
})

broker.on('subscribe', (subscriptions, client) => {
  console.log(`Broker -> Client ${client.id} subscribed to ${subscriptions}`)
})

broker.on('publish', async (packet, client) => {
  console.log(
    `Broker -> Client ${
      client ? client.id : ''
    } has published ${packet.payload.toString()}`
  )
})

server.listen(1883, () => console.log('Server is running on port 1883'))
