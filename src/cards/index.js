const shuffle = require('lodash').shuffle
const flatten = require('lodash').flatten
const { suits, numbers } = require('./types')

// Very condensed form after initial attempts of multiple returns and accompanying {} braces
const generatePokerCards = () => suits.map(suit => numbers.map(number => ({ suit, number })))
const generateFlatShuffled = () => shuffle(flatten(generatePokerCards()))

module.exports = {
  generateFlatShuffled
}