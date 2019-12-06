const orderBy = require('lodash').orderBy

// 2 paria
const twoPairsCheck = (cards) => {
  // Could do double map, but would have to return something empty on failing conditional
  // And filter it out anyway through uniqBy etc.
  let pairs = []
  cards.forEach((outerCard, outerIndex) => {
    return cards.forEach((innerCard, innerIndex) => {
      const sameIndex = outerIndex === innerIndex
      const sameValue = outerCard.number.value === innerCard.number.value

      const outerCombo = `${outerIndex}${innerIndex}`
      const innerCombo = `${innerIndex}${outerIndex}`

      const noComboFound = pairs
        .filter(pair => pair.index === outerCombo || pair.index === innerCombo)
        .length === 0

      if (!sameIndex && sameValue && noComboFound) {
        pairs.push({ index: outerCombo, first: outerCard, second: innerCard })
      }
    })
  })

  // Not really necessary destructuring but kept for testing purposes as it has no effect on end result
  const propFilteredPairs = pairs.map(({ index, ...rest }) => ({ ...rest }))
  return propFilteredPairs.length === 2
}

//Väri
const flushCheck = (cards) => {
  const suits = cards.map(card => card.suit)
  const checkedSuits = suits.map((suit, index) => {
    if (index < suits.length - 1) {
      return suit.name === suits[index + 1].name
    } else {
      // Separate conditional for last index as it would be out of bounds otherwise
      // Not absolutely necessary in every case, but would leave undefined as final value
      return suit.name === suits[index - 1].name
    }
  })

  const falseIndex = checkedSuits.findIndex(index => index === false)
  return falseIndex === -1 // Couldnt find an index with a false value --> therefore it is a flush
}

//Suora
const straightCheck = (cards) => {
  const numbers = cards.map(card => card.number)

  // Sort by asc or desc, doesnt matter
  const ascendingOrder = orderBy(numbers, ['value'], 'asc')
  // const descendingOrder = orderBy(numbers, ['value'], 'desc')

  const checkedAscNumbers = ascendingOrder.map((num, index) => {
    const value = num.value

    if (index < ascendingOrder.length - 1) {
      const nextValue = ascendingOrder[index + 1].value
      return Math.abs(value - nextValue) === 1
    } else {
      // Doesnt seem to be necessary here, but its just 1 index and streamlines falseIndex check
      const prevValue = ascendingOrder[index - 1].value
      return Math.abs(value - prevValue) === 1
    }
  })

  const falseIndex = checkedAscNumbers.findIndex(index => index === false)
  return falseIndex === -1
}

module.exports = {
  flushCheck,
  straightCheck,
  twoPairsCheck
}