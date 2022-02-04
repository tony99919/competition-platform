// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/**
 * Main method of the api that retrieves responses and manages them.
 * @param {string} req json containing the request, An instance of http.IncomingMessage. 
 * @param {string} res json containing the response, An instance of http.ServerResponse
 */
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const body = JSON.parse(req.body);
    update(body, res)
  } else {
    // Handle any other HTTP method
    res.status(400).send({ message: 'Only POST requests allowed' })
    return
  }
}

/**
 * update the contest
 * @param {string} body json containing the body request 
 * @param {string} res json containing the response 
 */
async function update(body, res) {
  const mylib = require('../../Mylib/index.js')
  try {
    const updates = {
      fk_contest: body.id,
      title: body.title,
      comment: body.comment,
      winningPercentage: body.winningPercentage,
      nbrTrade: body.nbrTrade,
      capitalGain: body.capitalGain,
      submitDate: new Date()
    }
    const id_pro_con = body.id_pro_con

    //update using myLib, request supabase
    const { data, error } = await mylib.updateContestForUser(updates, id_pro_con)

    if (error == null) {
      res.status(200).send({ message: 'ok ' })
    } else {
      if (data == null) {
        res.status(200).send({ message: "no updated lines." })
      } else {
        res.status(500).send({ message: error })
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}
