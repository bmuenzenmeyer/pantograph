require("dotenv").config()

const fetchCards = require("../../utils/fetchCards")

const { TRELLO_HOME_LIST_ID } = process.env

module.exports = async () => {
  return await fetchCards(TRELLO_HOME_LIST_ID)
}
