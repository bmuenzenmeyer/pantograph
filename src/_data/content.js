require("dotenv").config()

const fetchCards = require("../../utils/fetchCards")

const { TRELLO_PAGES_ID } = process.env

module.exports = () => {
  return fetchCards(TRELLO_PAGES_ID)
}
