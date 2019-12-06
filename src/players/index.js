const faker = require('faker').name
const generateName = () => faker.firstName()

const generatePlayers = (amount) => {
  let players = []
  for (let i = 0; i < amount; i++) {
    players = players.concat({ name: generateName() })
  }
  return players
}

module.exports = {
  generatePlayers
}