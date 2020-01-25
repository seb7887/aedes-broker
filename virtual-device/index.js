const mqtt = require('mqtt')

const client = mqtt.connect('mqtt://localhost', {
  username: 'test',
  password: 'test'
})

client.on('connect', () => {
  console.log('connected')
  const message = {
    message: 'test'
  }
  client.subscribe('test')
  client.publish('test', JSON.stringify(message))
})
client.on('close', () => console.log('not connected'))
client.on('error', error => {
  console.log(error.message)
  client.end()
})
