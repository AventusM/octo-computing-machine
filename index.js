const fs = require('fs')
const { generateFlatShuffled } = require('./src/cards/index')
const { flushCheck, straightCheck, twoPairsCheck } = require('./src/checker/index')
const { generatePlayers } = require('./src/players/index')

const play = () => {
  let results = []
  let availableCards = generateFlatShuffled()
  const players = generatePlayers(3)

  // Distribute cards
  const playersWithCards = players.map(player => {
    const SPLIT_INDEX = 5
    const playerCards = availableCards.slice(0, SPLIT_INDEX)
    const newRemaining = availableCards.slice(SPLIT_INDEX)
    availableCards = newRemaining

    return { name: player.name, cards: playerCards }
  })

  // Map results for analysis.txt
  playersWithCards.forEach(player => {
    const pCards = player.cards
    const flush = flushCheck(pCards)
    const twoPairs = twoPairsCheck(pCards)
    const straight = straightCheck(pCards)

    results.push({
      player: player.name,
      cards: pCards.map(card => (`${card.suit.name} / ${card.number.name} (${card.number.value})`)),
      flush: flush ? 'yes' : 'no',
      twoPairs: twoPairs ? 'yes' : 'no',
      straight: straight ? 'yes' : 'no'
    })
  })

  return JSON.stringify(results, null, 2)
}

fs.writeFile('analysis.txt', play(), (err) => {
  err
    ? console.log(`error: ${err}`)
    : console.log(`Results saved in analysis.txt`)
})
