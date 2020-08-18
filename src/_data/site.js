require("dotenv").config()

module.exports = {
  name: "Pantograph",
  host: new URL(process.env.URL || "https://localhost").host,
  trello_board: process.env.TRELLO_BOARD_URL,
}
