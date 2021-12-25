import { getSession } from 'next-auth/react'

export default async function (req, res) {
  const session = await getSession({ req, res })

  if (!session) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  } else {
    return res.status(200).json({
      message: 'Success',
      session
    })
  }
}