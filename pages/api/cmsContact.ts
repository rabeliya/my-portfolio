import { NextApiResponse, NextApiRequest } from 'next'
import isContact from '../../src/utils/TypeGuardUtils'

const contact = async (
  req: NextApiRequest,
  res: NextApiResponse
) : Promise<void> => {
  const X_WRITE_KEY = process.env.X_WRITE_KEY

  // req.messageにすると型エラー
  if(!isContact(req.body) || typeof X_WRITE_KEY === 'undefined') {
    return res.status(404).end()
  }

  const content = await fetch('https://k-portfolio.microcms.io/api/v1/contacts',{
    method: 'POST',
    headers: {
      'X-WRITE-API-KEY': X_WRITE_KEY,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(req.body)
  })
  .then(() => 'Created')
  .catch(() => null)

  if(content !== 'Created') {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  res.status(200).json({ message: 'OK' })
  res.end('Contact enabled')
}

export default contact