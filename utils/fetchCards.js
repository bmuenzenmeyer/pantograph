const fetch = require("node-fetch")

require("dotenv").config()

const {
  TRELLO_BOARD_ID,
  TRELLO_API_ATTACHMENTS,
  TRELLO_API_BOARD_CARDS,
  TRELLO_TOKEN,
  TRELLO_KEY,
  BRANCH,
} = process.env

const trelloBoardUrl = TRELLO_API_BOARD_CARDS.replace(
  "TRELLO_BOARD_ID",
  TRELLO_BOARD_ID
)

const extractProperty = (card, propName) => {
  const label = card.labels.filter((l) => {
    // console.log(l)
    return l.name.toLowerCase().startsWith(`${propName}:`)
  })

  if (label.length) {
    if (propName === "tag") {
      card[`tags`] = label.map(l => l.name.split(':')[1])
    } else {
      card[`tags`] = []
      card[`PANTOGRAPH_${propName}`] = label[0].name.split(":")[1]
    }
  }
}

module.exports = async (listID) => {
  // Fetch the JSON data about this board
  const response = await fetch(`${trelloBoardUrl}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
  const json = await response.json()
  
  // Just focus on the cards which are in the list we want
  // and do not have a closed status
  let contentCards = json.filter((card) => {
    return card.idList == listID && !card.closed
  })

  // only include cards labelled with "live" or with
  // the name of the branch we are in
  let contextCards = contentCards.filter((card) => {
    return card.labels.filter(
      (label) =>
        label.name.toLowerCase() == "live" ||
        label.name.toLowerCase() == BRANCH
    ).length
  })

  // If a card has an attachment, add it as an image in the descriotion markdown
  await contextCards.forEach(async (card) => {

    if(card.badges.attachments) {
      console.log('hi')

      const trelloAttachmentsUrl = TRELLO_API_ATTACHMENTS.replace("TRELLO_CARD_ID", card.id)

      await fetch(`${trelloAttachmentsUrl}?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(50, res)

      card.desc =
        card.desc +
        `\n![${card.name}](${res[0].url} '${card.name}')`
      })


    }

    extractProperty(card, "tag")

  })

  // return our data
  return contextCards
}
