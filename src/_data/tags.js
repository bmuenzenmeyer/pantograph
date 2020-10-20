require("dotenv").config()

const fetchCards = require("../../utils/fetchCards")

const { TRELLO_PAGES_ID } = process.env

// todo, try to make cardsByTag an array of cards that have each grouping of tags?


module.exports = async () => {
  const cardsByTag = []
  const data = await fetchCards(TRELLO_PAGES_ID)
  // take these cards and create buckets based on the tag
  data.forEach((card) => {
    if (card.tags) {
      card.tags.forEach((tag) => {
        // console.log({ tag })
        if (!cardsByTag.find) {
          cardsByTag[ta
        }
        cardsByTag[tag].push(card)
      })
    }
  })
  console.log({ cardsByTag })
  return cardsByTag
}
